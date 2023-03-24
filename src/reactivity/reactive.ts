import { mutableHandlers, readonlyHandles } from "./baseHandles";

export const enum ReactiveFlags {
  // 是否是 reactive
  IS_REACTIVE = "__v_isReactive",
  // 是否是 readonly
  IS_READONLY = "__v_isReadonly",
}

/**
 * 对传入对象进行代理
 * @param raw 普通对象
 * @returns Proxy 对象
 */
export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

/**
 * 对传入对象进行代理，且 只读
 * @param raw 普通对象
 * @returns 只读的 Proxy 对象
 */
export function readonly(raw) {
  return createActiveObject(raw, readonlyHandles);
}

/**
 * 对传入对象进行代理
 * @param raw 普通对象
 * @param baseHandles 包含 get 和 set
 * @returns 只读/非只读 的 Proxy 对象
 */
function createActiveObject(raw, baseHandles) {
  return new Proxy(raw, baseHandles);
}

/**
 * 检测是否是 reactive
 * @param value 检测对象
 * @returns {boolean} 是否是 reactive: true/false
 */
export function isReactive(value) {
  // value 为普通对象时，此值为 undefined，故转为布尔类型
  return !!value[ReactiveFlags.IS_REACTIVE];
}

/**
 * 检测是否是 readonly
 * @param value 检测对象
 * @returns {boolean} 是否是 readonly: true/false
 */
export function isReadonly(value) {
  // value 为普通对象时，此值为 undefined，故转为布尔类型
  return !!value[ReactiveFlags.IS_READONLY];
}
