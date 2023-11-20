import zlib from "zlib"
import path from "path"
import fs from "fs/promises"
import { createReadStream, createWriteStream } from "fs"
import { pipeline } from "stream/promises"

import { checkArguments } from "../utils/index.js"

export const compress = async (filePath, destinationPath) => {
  if (!checkArguments([filePath, destinationPath])) return

  try {
    const rFilePath = path.resolve(filePath)
    await fs.access(rFilePath, fs.constants.F_OK) // Check if the file exists

    const readStream = createReadStream(rFilePath)
    const writeStream = createWriteStream(path.resolve(destinationPath))

    await pipeline(
      readStream,
      zlib.createBrotliCompress({
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      }),
      writeStream
    )
  } catch (error) {
    console.error(error)
  }
}

export const decompress = async (filePath, destinationPath) => {
  if (!checkArguments([filePath, destinationPath])) return

  try {
    const rFilePath = path.resolve(filePath)
    await fs.access(rFilePath, fs.constants.F_OK) // Check if the file exists

    const readStream = createReadStream(rFilePath)
    const writeStream = createWriteStream(path.resolve(destinationPath))

    await pipeline(
      readStream,
      zlib.createBrotliDecompress({
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      }),
      writeStream
    )
  } catch (error) {
    console.error(error)
  }
}
