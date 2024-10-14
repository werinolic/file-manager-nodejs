import { writeFile } from 'fs/promises';
import { resolve } from 'node:path';
import {logger} from "../logger.js";
import {ERROR} from "../../common/constants.js";

export const add = async (directory, command) => {
  try {
    const filename = resolve(directory, command.value[0]);
    await writeFile(filename, '');
  } catch (err) {
    logger(err, ERROR);
  }
}