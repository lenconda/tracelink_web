export const empty = (object: any): boolean => {
  const keys = Object.keys(object);
  for (const key of keys) {
    if (object[key] && key !== '_id' && key !== '__v') { return false }
  }
  return true;
};
