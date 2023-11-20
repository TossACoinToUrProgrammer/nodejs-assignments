import fs from "fs/promises"
import crypto from "crypto"
import path from "path"
import { checkArguments } from "../utils/index.js"

export const calcHash = async (filePath) => {
  if (!checkArguments([filePath])) return

  try {
    const fileBuffer = await fs.readFile(path.resolve(filePath))
    const hash = crypto.createHash("sha256").update(fileBuffer)

    const hex = hash.digest("hex")
    console.log(hex)
  } catch (error) {
    console.error(error)
  }
}
