export function extractIds(stringsArray: string[]): string[] {
  return stringsArray.map((str) => {
    const parts = str.split("/");
    return parts[parts.length - 2];
  });
}
