import path from "path"
import fs from "fs/promises"
import { checkArguments } from "../utils/index.js"

export const up = () => {
  process.chdir("..")
}

export const cd = (directoryPath) => {
  if(!checkArguments([directoryPath], "Missing directory path")) return
  
  try {
    const normalized = path.normalize(directoryPath)
    process.chdir(path.resolve(normalized))    
  } catch (error) {
    console.error("Invalid input.", error)
  }
}

export const ls = async () => {
  const list = await fs.readdir(path.resolve("./"), { withFileTypes: true })
  const mapped = list.map((dirent) => ({
    Name: dirent.name,
    Type: dirent.isDirectory() ? "directory" : "file",
  }))

  const sorted = mapped.sort((a, b) => {
    if (a.Type === "directory" && b.Type === "file") return -1
    if (b.Type === "directory" && a.Type === "file") return 1

    const aLower = a.Name.toLowerCase()
    const bLower = b.Name.toLowerCase()

    if (aLower < bLower) return -1
    if (aLower > bLower) return 1

    return 0
  })

  console.table(sorted)
}
