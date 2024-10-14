import { join, resolve } from "node:path";
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, constants } from 'node:zlib';

import {logger} from "../logger.js";
import {ERROR} from "../../common/constants.js";

export const compress = async (directory, command) => {
  const filePath = resolve(directory, command.value[0]);
  const archive = join(directory, command.value[1], 'archive.gz');

  const brotli = createBrotliCompress({
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
    }
  });

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(archive);

  try {
    await pipeline(
      readStream,
      brotli,
      writeStream
    );
    return (`File compressed from "${filePath}" to "${archive}" successfully.`);
  } catch (error) {
    logger(`Error compressing file: ${error.message}`, ERROR);
  }
};