import { isTracking, trackEffects, triggerEffects } from "./effect";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
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
