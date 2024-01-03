/* eslint-disable @typescript-eslint/no-explicit-any */
export const flattenObject = (ob: any, delimiter = "_") => {
  if(Array.isArray(ob)) {
    const array: any[] = [];

    for(const item of ob) {
      const flatten = flattenObject(item);
      array.push(flatten);
    }

    return array;
  }
  const result: any = {};
  for (const i in ob) {
    if ((typeof ob[i]) === "object" && !Array.isArray(ob[i]) && !(ob[i] instanceof Date)) {
      const temp = flattenObject(ob[i]);
      for (const j in temp) {
        result[i + delimiter + j] = temp[j];
      }
    }

    else {
      result[i] = ob[i];
    }
  }
  return result;
};