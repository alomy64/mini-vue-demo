import { extend } from "../shared/index";

let activeEffect; // 当前 effect
let shouldTrack = false; // 是否应该收集依赖

class EffectReactive {
  private _fn: any;
  // 收集此 effect 对应的所有 dep
  deps = [];
  // 状态，防止多次调用 stop 方法时多次清空
  active = true;
  // onStop 有值的话，则在 stop 方法执行之后调用
  onStop?: () => void;

  /**
   * constructor
   * @param fn 要 收集/执行 的函数
   * @param scheduler 可选参数，public，使外部可以访问到 scheduler
   */
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  // fn 执行方法
  run() {
    // stop 时直接调用当前的 fn 并返回
    if (!this.active) {
      return this._fn();
    }

    shouldTrack = true; // 应该收集依赖
    activeEffect = this; // effect 绑定
    const result = this._fn(); // 执行 fn 并返回
    shouldTrack = false; // 重置, 不应该收集依赖

    return result;
  }

  stop() {
    // active 为 true 时，清空 effect 并更改 active 状态
    if (this.active) {
      // 传入此 effect，调用 cleanupEffect 进行清除
      cleanupEffect(this);
      // 有 onStop 的情况
      if (this.onStop) {
        // 则会执行 onStop 方法
        this.onStop();
      }
      // 设置状态为 false，以防多次调用时多次清空
      this.active = false;
    }
  }
}

/**
 * 清除 effect
 * @param effect effect
 */
function cleanupEffect(effect) {
  // 清除 dep 中的 effect
  effect.deps.forEach((dep: any) => {
    // Set 删除 effect
    dep.delete(effect);
  });
}

/**
 * effect
 * @param fn 需要被依赖收集的函数
 * @param options 可传 scheduler
 * @returns effect 执行 run 方法之后返回的 fn
 */
export function effect(fn, options: any = {}) {
  // 根据传入的 fn 和 scheduler 创建 EffectReactive 实例
  const _effect = new EffectReactive(fn, options.scheduler);

  // 将 options 合并入 effect
  extend(_effect, options);

  // 执行effect
  _effect.run();

  // 以当前的实例作为 this 的指向
  const runner: any = _effect.run.bind(_effect);
  // 将 effect 实例挂载到 runner
  runner.effect = _effect;

  return runner;
}

// 保存所有 target 的 Map
const targetMap = new Map();

/**
 * 依赖收集
 * @param target 需要依赖收集的目标对象
 * @param key 要进行依赖收集的属性
 */
export function track(target, key) {
  if (!isTracking()) return; // 不进行依赖收集

  // 目标 target 所对应的 Map
  let depsMap = targetMap.get(target);

  // 首次无 depsMap 的情况
  if (!depsMap) {
    // 需创建新的 depsMap
    depsMap = new Map();
    // 将创建后的 desMap 添加到 targetMap
    targetMap.set(target, depsMap);
  }

  // 目标 key 所对应的 dep
  let dep = depsMap.get(key);
  // 首次无 dep 的情况
  if (!dep) {
    // 需创建新的 dep，使用 Set 避免重复
    dep = new Set();
    // 将创建后的 de 添加到 depsMap
    depsMap.set(key, dep);
  }

  if (dep.has(activeEffect)) return; // 判断 dep 之前有没有添加过, 有的话直接返回

  dep.add(activeEffect);  // 将 activeEffect 添加到 dep
  activeEffect.deps.push(dep); // 将 activeEffect 对应的所有 dep 收集到 deps
}

/**
 * 是否应该收集依赖
 * @returns {boolean} 是否应该收集依赖
 */
function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

/**
 * 依赖触发
 * @param target 需要依赖触发的目标对象
 * @param key 要进行依赖触发的属性
 */
export function trigger(target, key) {
  // 根据 target 找到对应的 desMap
  const depsMap = targetMap.get(target);
  // 根据 key 找到对应的 dep
  const dep = depsMap.get(key);
  // 循环 dep
  for (const effect of dep) {
    /**
     * 调用执行每个 effect
     * 如果有 scheduler，就执行 scheduler
     * 否则，执行 run 方法
     */
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

/**
 * 调用此方法后，停止执行传入的 runner 对应的 effect
 * @param runner effect 返回的 runner
 */
export function stop(runner) {
  // 调用 runner 上 effect 的 stop 方法
  runner.effect.stop();
}
