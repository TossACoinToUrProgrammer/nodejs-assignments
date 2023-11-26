// Normalize path by removing trailing slashes
export const normalizePath = (path: string): string => {
  return path.replace(/\/+$/, "")
}
