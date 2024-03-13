// 合并对象
export const extend = Object.assign;

// 是否为对象
export const isObject = (value) => {
  return value !== null && typeof value === "object";
};
