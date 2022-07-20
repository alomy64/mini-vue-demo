import { ReactiveEffect } from "./effect";

class ComputedRefImpl {
  private _getter: any;
  private _dirty: boolean = true;
  private _value: any;
  private _effect: ReactiveEffect;
  constructor(getter) {
    this._getter = getter;
    // 当依赖的响应式对象的值发生改变时, trigger => scheduler => dirty
    this._effect = new ReactiveEffect(this._getter, () => {
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }
  get value() {
    // get value 被调用过 => 缓存值
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }

    return this._value;
  }
}

// computed
export function computed(getter) {
  return new ComputedRefImpl(getter);
}
