import { h } from "../../lib/mini-vue3.esm.js";

export const App = {
  // 必须要写 render
  render() {
    return h(
      "div",
      { id: "root", class: ["red", "hard"] },
      // "hi, " + this.msg,

      // String Array
      // "hi, mini-vue3", // String
      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue3")] // Array
    );
  },
  setup() {
    return { msg: "mini-vue3" };
  },
};
