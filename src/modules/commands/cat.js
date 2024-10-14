import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { ERROR } from "../../common/constants.js";
import { logger } from "../logger.js";

export const cat = async (directory, command) => {
  const file = resolve(directory, command.value[0]);
  const readableStream = createReadStream(file, { encoding: 'utf8' });
  try {
    for await (const chunk of readableStream) {
      console.log(chunk);
    }
  } catch (err) {
    logger(`An error occurred while reading the file: ${err.message}`, ERROR);
  }
}