import { reactive } from "../reactive";

describe("reactive", () => {
  it("get", () => {
    const user = { age: 1 };
    const userReactive = reactive(user);

    expect(user).not.toBe(userReactive);
    expect(userReactive.age).toBe(1);
  });
});
