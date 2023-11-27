import * as http from "http"
import "dotenv/config"

import { requestHandler } from "./handlers/requestHandler"

const server = http.createServer()

const port = process.env.PORT

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

server.on("request", requestHandler)
