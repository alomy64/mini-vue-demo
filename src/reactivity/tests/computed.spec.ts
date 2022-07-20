import { reactive } from "../reactive";
import { computed } from "../computed";

describe("computed", () => {
  it("happy path", () => {
    const user = reactive({ age: 1 });
    const age = computed(() => user.age);
    expect(age.value).toBe(1);
  });
  // computed 缓存
  it("should compute lazily", () => {
    const value = reactive({ foo: 1 });
    const getter = jest.fn(() => value.foo);
    const cValue = computed(getter);

    // lazy 懒执行 => 没有执行 cValue.value 的话, getter 不会被调用
    expect(getter).not.toHaveBeenCalled();
    // get => getter 调用
    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);
    // 再次 get => 拿到缓存值, getter 不被调用
    cValue.value; // get
    expect(getter).toHaveBeenCalledTimes(1);

    // 当依赖的响应式对象的值发生改变时, 进行缓存
    value.foo = 2; // trigger => effect => get 重新执行
    expect(getter).toHaveReturnedTimes(1);
    // get => getter 调用
    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);
    // 再次 get => 拿到缓存值, getter 不被调用
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
