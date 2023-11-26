import * as http from "http"
import "dotenv/config"

import { handleUsersReq } from "./handlers/usersHandler"
import { handleUsersIdReq } from "./handlers/usersIdHandler"
import { sendResponse } from "./utils/sendResponse"
import { parseUrl } from "./utils/parseUrl"

const server = http.createServer()

const port = process.env.PORT

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

server.on("request", async (req, res) => {
  try {
    const path = parseUrl(req.url)

    switch (true) {
      case path === "/api/users":
        await handleUsersReq(req, res)
        return

      case path.startsWith("/api/users"):
        await handleUsersIdReq(req, res)
        return

      default:
        sendResponse(res, 404, "Requested endpoint doesn't exist")
    }
    
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error")
  }
})
