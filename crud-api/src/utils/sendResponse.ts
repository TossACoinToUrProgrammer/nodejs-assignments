import { ServerResponse } from "http"

export const sendResponse = (res: ServerResponse, statusCode: number, body: string) => {
  res.writeHead(statusCode, { "Content-Type": "text/plain" })
  res.end(body)
}
