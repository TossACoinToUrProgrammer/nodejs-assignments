import os from "os"
import { checkArguments } from "../utils/index.js"

export const osCommand = (param) => {
  if(!checkArguments([param])) return

  switch (param) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL))
      break

    case "--cpus":
      const cpus = os.cpus()
      console.log("amount of CPUs:", cpus.length)
      console.log(cpus.map((cpu) => ({ model: cpu.model, speed: cpu.speed })))
      break

    case "--homedir":
      console.log(os.homedir())
      break

    case "--username":
      console.log(os.userInfo().username)
      break

    case "--architecture":
      console.log(process.arch)
      break
      
    default:
      console.error("parameter doesn't exist")
      return
  }
}
