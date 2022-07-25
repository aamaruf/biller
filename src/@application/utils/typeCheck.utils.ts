export function isNull(data: any) {
  if (data === null || data === undefined || data === "" || data === "null") {
    return true;
  }
  return false;
}
