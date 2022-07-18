export const extend = Object.assign;

// 判断 是否为 object
export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

// 值有没有改变
export const hasChanged = (val, newValue) => {
  return !Object.is(val, newValue);
};
