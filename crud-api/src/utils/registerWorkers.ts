import { Cluster, Worker } from "cluster"
import { WorkerMessage } from "../models"

export const registerWorkers = (cluster: Cluster, port: number, count: number) => {
  const workers: Worker[] = []

  for (let i = 1; i < count; i++) {
    const worker = cluster.fork({ workerPort: port + i })
    workers.push(worker)
  }

  // Workers broadcasting
  workers.forEach((worker) => {
    worker.on("message", (message: WorkerMessage) => {
      for (const otherWorker of workers) {
        if (otherWorker !== worker) {
          otherWorker.send(message)
        }
      }
    })
  })

  return workers
}
