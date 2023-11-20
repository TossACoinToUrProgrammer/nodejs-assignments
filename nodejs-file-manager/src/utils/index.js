import os from "os"

export const logCurrentPath = () => {
  console.log("You are currently in", process.cwd())
}

export const changeDirectoryToHome = () => {
  process.chdir(os.homedir())
}

export const getUsernameFromArgs = () => {
  return process.argv.find((el) => el.startsWith("--username=")).slice(11)
}

export const checkArguments = (args, message = '') => {
  if (args.some((arg) => !arg)) {
    if (message) console.error(message)
    else if (args.length === 1) console.error("Invalid input. Argument must be provided")
    else console.error(`Invalid input. ${args.length} arguments must be provided`)

    return false
  }

  // return true if arguments were provided properly
  return true
}
