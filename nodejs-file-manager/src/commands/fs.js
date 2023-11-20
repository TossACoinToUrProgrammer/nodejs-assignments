import { createReadStream, createWriteStream } from "fs"
import fs from "fs/promises"
import path from "path"
import { pipeline } from "stream/promises"
import { checkArguments } from "../utils/index.js"

export const cat = (filePath) => {
  if(!checkArguments([filePath])) return

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(path.resolve(filePath), "utf8")
    readStream.on("data", (chunk) => {
      console.log(chunk)
    })

    readStream.on("end", () => {
      resolve("")
    })

    readStream.on("error", (err) => {
      console.log("Invalid input.", err)
    })
  })
}

export const add = async (filename) => {
  if(!checkArguments([filename])) return

  try {
    await fs.writeFile(path.resolve(filename), "")
    console.log("File created")
  } catch (error) {
    console.error("Invalid input.", error)
  }
}

export const rn = async (filePath, newFileName) => {
  if(!checkArguments([filePath, newFileName])) return

  const resolvedPath = path.resolve(filePath)
  const resolverNewPath = path.resolve(newFileName)

  try {
    // check if newPath exists
    await fs.access(resolverNewPath, fs.constants.F_OK)
  } catch {
    // rename file only if newPath doesn't already exists
    try {
      await fs.rename(resolvedPath, resolverNewPath)
      console.log("Successfully renamed")
    } catch (error) {
      console.error("Invalid input.", error)
    }
    return
  }

  console.error(`FS operation failed, ${newFileName} already exists`)
}

export const cp = async (filePath, copyFolder) => {
  if(!checkArguments([filePath, copyFolder])) return

  try {
    const rFilePath = path.resolve(filePath)

    await fs.access(rFilePath, fs.constants.F_OK) // Check if the file exists
    const readStream = createReadStream(rFilePath)
    const writeStream = createWriteStream(path.resolve(copyFolder), {
      flags: "w",
    })

    await pipeline(readStream, writeStream) // Asynchronous pipeline

    console.log("File copied successfully.")
  } catch (error) {
    console.error("Invalid input.", error)
  }
}

export const mv = async (filePath, directoryPath) => {
  if(!checkArguments([filePath, directoryPath])) return

  try {
    const rFilePath = path.resolve(filePath)
    const rDirectory = path.resolve(directoryPath)

    await fs.access(rFilePath, fs.constants.F_OK) // Check if the file exists

    const fileName = path.basename(rFilePath)
    const readStream = createReadStream(rFilePath)
    const writeStream = createWriteStream(path.join(rDirectory, fileName), {
      flags: "w",
    })

    await pipeline(readStream, writeStream) // Asynchronous pipeline
    await fs.rm(path.resolve(filePath))
    console.log("File moved successfully.")
  } catch (error) {
    console.error("Invalid input.", error)
  }
}

export const rm = async (filePath) => {
  if(!checkArguments([filePath], "Invalid input. Path to file must be provided")) return

  try {
    await fs.rm(path.resolve(filePath))
    console.log("File deleted.")
  } catch (error) {
    console.error("Invalid input.", error)
  }
}
