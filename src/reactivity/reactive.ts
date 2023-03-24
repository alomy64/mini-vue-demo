import { mutableHandlers, readonlyHandles } from "./baseHandles";

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
