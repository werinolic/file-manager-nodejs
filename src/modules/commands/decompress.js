import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'node:zlib';
import { join, resolve } from "node:path";

import {logger} from "../logger.js";
import {ERROR} from "../../common/constants.js";

export const decompress = async (directory, command) => {
  const archivePath = resolve(directory, command.value[0]);
  const filePath = join(directory, command.value[1]);

  const brotli = createBrotliDecompress();

  const readStream = createReadStream(archivePath);
  const writeStream = createWriteStream(filePath);

  try {
    await pipeline(
      readStream,
      brotli,
      writeStream
    );
    return `File decompressed from "${archivePath}" to "${filePath}" successfully.`;
  } catch (error) {
    logger(`Error decompressing file: ${error.message}`, ERROR);
  }
}