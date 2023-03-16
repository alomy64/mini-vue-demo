class EffectReactive {
  private _fn: any;

  /**
   * constructor
   * @param fn 要 收集/执行 的函数
   */
  constructor(fn) {
    this._fn = fn;
  }

  // fn 执行方法
  run() {
    // activeEffect 绑定
    activeEffect = this;
    // 执行 fn
    this._fn();
  }
}

// 当前 effect
let activeEffect;

/**
 * effect
 * @param fn 需要被依赖收集的函数
 */
export function effect(fn) {
  // 根据传入的 fn 创建 EffectReactive 实例
  const _effect = new EffectReactive(fn);

  // 执行effect
  _effect.run();
}

// 保存所有 target 的 Map
const targetMap = new Map();

/**
 * 依赖收集
 * @param target 需要依赖收集的目标对象
 * @param key 要进行依赖收集的属性
 */
export function track(target, key) {
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

  // 将 activeEffect 添加到 dep
  dep.add(activeEffect);
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
    // 调用执行每个 effect
    effect.run();
  }
}
