import { isReadonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { fo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });
  // set => warn
  it("warn then call set", () => {
    console.warn = jest.fn();

    const user = shallowReadonly({ age: 10 });
    user.age = 12;
    expect(console.warn).toBeCalled();
  });
});
