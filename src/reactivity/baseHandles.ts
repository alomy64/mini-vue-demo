import { track, trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

// 创建 get，初始化时调用一次即可
const get = createGetter();
// 创建 set，初始化时调用一次即可
const set = createSetter();
// 创建只读 get，初始化时调用一次即可
const readonlyGet = createGetter(true);

/**
 * 创建 getter
 * @param isReadonly 是否只读，默认非只读
 * @returns get 方法
 */
function createGetter(isReadonly = false) {
  /**
   * 获取属性对应的值
   * @param target 目标对象
   * @param key 要获取的属性
   * @returns Reflect 对象获取的属性对应的值
   */
  return function get(target, key) {
    const res = Reflect.get(target, key);

    // key 为 .IS_REACTIVE 时，说明此为 reactive
    if (key === ReactiveFlags.IS_REACTIVE) {
      // 故返回 true
      return !isReadonly;
    }

    // 非只读的情况
    if (!isReadonly) {
      // 进行依赖收集
      track(target, key);
    }

    return res;
  };
}

/**
 * 创建 setter
 * @returns set 方法
 */
function createSetter() {
  /**
   * 设置属性值
   * @param target 目标对象
   * @param key 要设置的属性
   * @param value 要设置的值
   * @returns Reflect 对象设置后返回的值 true/false
   */
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);

    // 依赖触发
    trigger(target, key);

    return res;
  };
}

/**
 * 包含 get 和 set
 */
export const mutableHandlers = {
  get,
  set,
};

/**
 * 包含 get 和 set，且 只读
 */
export const readonlyHandles = {
  get: readonlyGet,
  /**
   * 设置属性值，失败
   * @param target 目标对象
   * @param key 要设置的属性
   * @param value 要设置的值
   * @returns Reflect 对象设置后返回的值 true/false
   */
  set(target, key, value) {
    console.warn(
      `key: 将 ${key} 的值修改为 ${value} 操作失败，因为 ${target} 是只读的`,
      target
    );

    return true;
  },
};
