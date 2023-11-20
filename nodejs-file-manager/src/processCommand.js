import { compress, decompress } from "./commands/zlib.js"
import { add, cat, cp, mv, rm, rn } from "./commands/fs.js"
import { calcHash } from "./commands/hash.js"
import { cd, ls, up } from "./commands/nwd.js"
import { osCommand } from "./commands/os.js"

export const processCommand = async (command, params) => {
  switch (command) {
    case "up":
      up()
      break

    case "cd":
      cd(params[0])
      break

    case "ls":
      await ls()
      break

    case "cat":
      await cat(params[0])
      break

    case "add":
      await add(params[0])
      break

    case "rn":
      await rn(...params)
      break

    case "cp":
      await cp(...params)
      break

    case "mv":
      await mv(...params)
      break

    case "rm":
      await rm(...params)
      break

    case "os":
      osCommand(...params)
      break

    case "hash":
      await calcHash(...params)
      break

    case "compress":
      await compress(...params)
      break

    case "decompress":
      await decompress(...params)
      break

    default:
      console.error("command doesn't exist")
      return
  }
}
