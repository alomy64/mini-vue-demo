import { track, trigger } from "./effect";

/**
 * 对传入对象进行代理
 * @param raw 普通对象
 * @returns Proxy 对象
 */
export function reactive(raw) {
  return new Proxy(raw, {
    /**
     * 获取属性对应的值
     * @param target 目标对象
     * @param key 要获取的属性
     * @returns Reflect 对象获取的属性对应的值
     */
    get(target, key) {
      const res = Reflect.get(target, key);

      track(target, key);
      return res;
    },
    /**
     * 设置属性值
     * @param target 目标对象
     * @param key 要设置的属性
     * @param value 要设置的值
     * @returns  Reflect 对象设置后返回的值 true/false
     */
    set(target, key, value) {
      const res = Reflect.set(target, key, value);

      trigger(target, key);
      return res;
    },
  });
}
