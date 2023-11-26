import { parse } from "url"
import { normalizePath } from "./normalizePath"

export const parseUrl = (reqUrl: string = '') => {
  const parsedUrl = parse(reqUrl, true)
  return normalizePath(parsedUrl.path || "")
}
