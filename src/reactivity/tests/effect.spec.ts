import { reactive } from "../reactive";
import { effect } from "../effect";

describe("effect", () => {
  it("happy path", () => {
    let userReactive = reactive({ age: 1 });
    let userAge;

    effect(() => {
      userAge = userReactive.age + 1;
    });

    // get
    expect(userAge).toBe(2);

    // set
    userReactive.age++;
    expect(userAge).toBe(3);
  });
  it("调用 effect 返回 runner", () => {
    let count = 10;
    const runner = effect(() => {
      count++;
      return "Hello";
    });

    expect(count).toBe(11);

    const r = runner();

    expect(count).toBe(12);
    expect(r).toBe("Hello");
  });
});
