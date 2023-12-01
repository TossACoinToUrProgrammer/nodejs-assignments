import * as http from "http"
import "dotenv/config"
import { IncomingMessage, ServerResponse } from "http"

import { getRequestBody } from "../utils/getRequestBody"
import { sendResponse } from "../utils/sendResponse"

export const LBRequestHandler = (req: IncomingMessage, res: ServerResponse, currentPort: number) => {
  try {
    const options = {
      hostname: "localhost",
      port: currentPort,
      path: req.url,
      method: req.method,
    }

    const innerReq = http.request(options, async (innerRes) => {
      const response = await getRequestBody(innerRes)
      res.writeHead(innerRes.statusCode!, innerRes.headers)
      res.end(response)
    })

    innerReq.on("error", (error) => {
      console.error("Inner Request Error:", error)
      sendResponse(res, 500, "Internal Server Error")
    })
    console.log(`port ${currentPort} handled request ${req.url} ${req.method}`)

    // Send the request body if present
    req.pipe(innerReq)

    // End the request to trigger the inner request
    req.on("end", () => {
      innerReq.end()
    })
  } catch (error) {
    sendResponse(res, 500, "Internal Server sError")
  }
}
