import { readonly, isReadonly } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const user = { age: 1, address: { city: "BeiJing" } };
    const userReadonly = readonly(user);

    expect(userReadonly).not.toBe(user);
    expect(userReadonly.age).toBe(1);
  });
  it("调用 set 时发出警告", () => {
    console.warn = jest.fn();
    const userReadonly = readonly({
      age: 1,
    });

    userReadonly.age = 2;

    expect(console.warn).toBeCalled();
  });
  it("isReadonly", () => {
    const user = { age: 1, address: { city: "BeiJing" } };
    const userReadonly = readonly(user);

    expect(isReadonly(userReadonly)).toBe(true);
    expect(isReadonly(user)).toBe(false);
  });
});
