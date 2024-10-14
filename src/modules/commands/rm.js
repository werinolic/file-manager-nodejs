import { unlink } from 'node:fs/promises';
import { resolve } from "node:path";
import {ERROR, MESSAGE} from "../../common/constants.js";
import {logger} from "../logger.js";

export const  rm = async (directory, command) => {
  const filePath = resolve(directory, command.value[0]);
  try {
    await unlink(filePath);
    logger(`File "${filePath}" has been deleted successfully.`, MESSAGE);
  } catch (error) {
    logger(`Error deleting file "${filePath}": ${error.message}`, ERROR);
  }
}
