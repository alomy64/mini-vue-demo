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
});
