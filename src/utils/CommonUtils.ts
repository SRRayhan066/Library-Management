export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0;
};

export function isActivePath(currentPath: string, itemPath: string): boolean {
  if (itemPath === "/") return currentPath === "/";

  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}
