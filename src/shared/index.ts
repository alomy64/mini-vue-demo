export const extend = Object.assign;

// 判断 是否为 object
export const isObject = (val) => {
  return val !== null && typeof val === "object";
};
