import { reactive, isReactive } from "../reactive";

describe("reactive", () => {
  it("get", () => {
    const user = { age: 1 };
    const userReactive = reactive(user);

    expect(user).not.toBe(userReactive);
    expect(userReactive.age).toBe(1);

    expect(isReactive(userReactive)).toBe(true);
    expect(isReactive(user)).toBe(false);
  });
});
