import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {logger} from "../logger.js";
import {ERROR} from "../../common/constants.js";
const { createHash } = await import("node:crypto");

export const hash = async (directory, command) => {
  const filePath = resolve(directory, command.value[0]);
  try {
    const input = await readFile(filePath);
    return createHash("sha256").update(input).digest('hex');
  } catch (error) {
    logger(`Error hash file: ${error.message}`, ERROR);
  }
};
