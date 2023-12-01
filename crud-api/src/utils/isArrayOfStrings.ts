export const isArrayOfStrings = (arr: any[]) => {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string")
}
