import { stat, rename } from "node:fs";
import { join, resolve } from "node:path";
import {ERROR} from "../../common/constants.js";
import {logger} from "../logger.js";

export const rn = async (directory, command) => {
  const oldFilePath = resolve(directory, command.value[0]);
  const newFilePath = join(directory, command.value[1]);
  stat(newFilePath, (err) => {
    if (err) {
      rename(oldFilePath, newFilePath, (e) => {
        if (e) {
          logger("FS operation failed", ERROR);
        }
      });
    } else {
      logger("FS operation failed", ERROR);
    }
  });
};