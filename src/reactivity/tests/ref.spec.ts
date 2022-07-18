import { effect } from "../effect";
import { ref } from "../ref";

describe("ref", () => {
  it("happy path", () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });
  // reactive
  it("should a reactive", () => {
    const a = ref(1);
    let dummmy;
    let calls = 0;
    effect(() => {
      calls++;
      dummmy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummmy).toBe(1);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummmy).toBe(2);
    // 值未改变时, 不被调用
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummmy).toBe(2);
  });
  // 接收对象
  it("should make nested properties reactive", () => {
    const a = ref({ count: 1 });
    let dummmy;
    effect(() => {
      dummmy = a.value.count;
    });
    expect(dummmy).toBe(1);
    a.value.count = 2;
    expect(dummmy).toBe(2);
  });
});
