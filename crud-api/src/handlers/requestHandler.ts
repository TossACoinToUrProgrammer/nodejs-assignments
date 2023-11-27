import { IncomingMessage, ServerResponse } from "http"

import { parseUrl } from "../utils/parseUrl"
import { handleUsersReq } from "./usersHandler"
import { handleUsersIdReq } from "./usersIdHandler"
import { sendResponse } from "../utils/sendResponse"

export async function requestHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    const path = parseUrl(req.url)

    switch (true) {
      case path === "/api/users":
        await handleUsersReq(req, res)
        return

      case path.startsWith("/api/users"): // /api/users/{id}
        await handleUsersIdReq(req, res)
        return

      default:
        sendResponse(res, 404, "Requested endpoint doesn't exist")
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error")
  }
}
