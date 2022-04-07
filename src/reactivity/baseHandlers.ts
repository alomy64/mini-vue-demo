import { track, trigger } from "./effect";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

// get
function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);

    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}
// set
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);

    trigger(target, key);
    return res;
  };
}
// reactive
export const mutableHandlers = { get, set };
// readonly
export const readonlyHandlers = {
  get: readonlyGet,
  // not set => warn
  set(target, key, value) {
    console.warn(`key：${key} set 失败，因为 target 是 readonly`, target);
    return true;
  },
};
