import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先把组件转化成虚拟节点, 所有的逻辑操作都会基于 vnode 做处理
      // component => vnode
      const vnode = createVNode(rootComponent);
      // render(rootComponent, rootContainer);
      render(vnode, rootContainer);
    },
  };
}
