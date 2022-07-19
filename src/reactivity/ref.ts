import { isTracking, trackEffects, triggerEffects } from "./effect";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";

class RefImpl {
  public dep;
  public __v_isRef = true;
  private _value: any;
  private _rawValue: any;
  constructor(value) {
    this._rawValue = value; // 保留普通 object, 以便 set value 时对比
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    /* 
      value 改变的情况
      object 和 object 对比, 而非 object 和 reactive
    */
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue; // 一定要先修改 value
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

// object => reactive(value) 判断是否为对象, 是 => reactive(value) 否 => value
function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

// 是否为 ref => Boolean
export function isRef(ref) {
  return !!ref.__v_isRef;
}

// unRef 判断是否为 ref, 是 => ref.value 否 => ref
export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

// proxyRefs
export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    // get: ref => .value, not ref => value
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },
    // set
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        // not ref(value) => 赋值
        return (target[key].value = value);
      } else {
        // ref(value) => 替换
        return Reflect.set(target, key, value);
      }
    },
  });
}
