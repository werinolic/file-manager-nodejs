import { unlink } from 'node:fs/promises';
import { resolve } from "node:path";
import { ERROR } from "../../common/constants.js";
import { logger } from "../logger.js";

export const  rm = async (directory, command) => {
  const filePath = resolve(directory, command.value[0]);
  try {
    await unlink(filePath);
    return `File "${filePath}" has been deleted successfully.`;
  } catch (error) {
    logger(`Error deleting file "${filePath}": ${error.message}`, ERROR);
  }
}
