import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

// reactive
export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}
// readonly
export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}

function createActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
