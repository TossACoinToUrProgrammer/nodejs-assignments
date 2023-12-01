import * as http from "http"
import "dotenv/config"
import cluster from "cluster"
import { availableParallelism } from "os"

import { requestHandler } from "./handlers/requestHandler"
import { WorkerMessage } from "./models"
import { setUsers } from "./userData"
import { LBRequestHandler } from "./handlers/LBRequestHandler"
import { registerWorkers } from "./utils/registerWorkers"
import { isMultiEnabled } from "./utils/isMultiEnabled"

const port = Number(process.env.PORT)

const args = process.argv

if (isMultiEnabled()) {
  // with horizontal scaling
  if (cluster.isPrimary) {
    const numCPUs = availableParallelism()
    registerWorkers(cluster, port, numCPUs)

    const server = http.createServer()
    server.listen(port, () => {
      console.log(`Load balancer is running at http://localhost:${port}`)
    })

    let currentPort = port + 1

    server.on("request", async (req, res) => {
      LBRequestHandler(req, res, currentPort)
      currentPort = currentPort === port + (numCPUs - 1) ? port + 1 : currentPort + 1
    })
  } else {
    // Worker
    const workerPort = process.env.workerPort
    const server = http.createServer()
    server.listen(workerPort, () => {
      console.log(`Server is running at http://localhost:${workerPort}`)
    })
    server.on("request", requestHandler)

    process.on("message", (message: WorkerMessage) => {
      if (message.type === "syncUsers") {
        setUsers(message.data)
      }
    })
  }
} else {
  // Single process
  const server = http.createServer()
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })

  server.on("request", requestHandler)
}
