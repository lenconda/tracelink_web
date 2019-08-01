export const empty = (object: any): boolean => {
  const values = Object.keys(object).map(value => object[value]);
  for (const value of values) {
    if (value) { return true }
  }
  return false;
};
