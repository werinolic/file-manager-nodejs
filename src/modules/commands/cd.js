import { resolve } from 'node:path';
import {stat} from 'node:fs/promises';
import {logger} from "../logger.js";
import {ERROR} from "../../common/constants.js";

export const cd = async (directory, command) => {
  const absolutePath = directory;
  const relativePath = command.value;
  const combinedPath = resolve(absolutePath, relativePath);

  try {
    const stats = await stat(combinedPath);
    if (stats.isDirectory()) {
      return combinedPath;
    } else {
      logger(`The path exists but is not a directory: ${combinedPath}`, ERROR);
      return null;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger(`Directory does not exist: ${combinedPath}`, ERROR);
    } else {
      logger(err,ERROR);
    }
    return null;
  }
}