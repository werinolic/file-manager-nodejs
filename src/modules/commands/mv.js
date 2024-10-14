import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { join, resolve } from "node:path";
import {logger} from "../logger.js";
import {ERROR, MESSAGE} from "../../common/constants.js";


export const mv = async (directory, command) => {
  const oldFilePath = resolve(directory, command.value[0]);
  const newFilePath = join(directory, command.value[1]);
  const readStream = createReadStream(oldFilePath);
  const writeStream = createWriteStream(newFilePath);

  try {
    await pipeline(readStream, writeStream);
    await unlink(oldFilePath);
    return `File moved from "${oldFilePath}" to "${newFilePath}" successfully.`;
  } catch (error) {
    logger(`Error moving file: ${error.message}`, ERROR);
  }
}