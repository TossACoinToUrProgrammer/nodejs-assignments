import readline from "readline/promises"
import { stdin as input, stdout as output } from "process"

import { processCommand } from "./processCommand.js"
import { changeDirectoryToHome, getUsernameFromArgs, logCurrentPath } from "./utils/index.js"

const username = getUsernameFromArgs()
console.log(`Welcome to the File Manager, ${username}!`)

changeDirectoryToHome()
logCurrentPath()


const rl = readline.createInterface({ input, output })

rl.on("line", async (msg) => {
  if (msg === ".exit") {
    return rl.close()
  }

  const trimmed = msg.replace(/\s+/g,' ').trim() //remove extra spaces
  const [command, ...params] = trimmed.split(" ")

  await processCommand(command, params)
  logCurrentPath()
})

rl.on("close", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
)
