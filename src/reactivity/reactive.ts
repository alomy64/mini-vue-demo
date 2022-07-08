import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

// reactive
export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}
// readonly
export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}
// shallowReadonly
export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers);
}
// isReadonly
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}
// isReactive
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

function createActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
