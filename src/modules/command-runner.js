import {UP, LS, CD, CAT, ADD, RN, CP, MV, RM} from "../command-list.js";
import { up } from './commands/up.js';
import { ls } from './commands/ls.js';
import { cd } from './commands/cd.js';
import { cat } from "./commands/cat.js";
import { add } from "./commands/add.js";
import { rn } from "./commands/rn.js";
import { cp } from "./commands/cp.js";
import { mv } from "./commands/mv.js";
import { rm } from "./commands/rm.js";

const commandRunner = async (directory, command) => {
  switch (command.name) {
    case UP: {
      const newDirectory = up(directory);
      return {
        message: '',
        directory: newDirectory
      }
    }
    case LS: {
      const listOfFiles = await ls(directory);
      return {
        message: listOfFiles,
        directory: directory
      }
    }
    case CD: {
      const newDirectory = await cd(directory, command);
      return {
        message: '',
        directory: newDirectory ? newDirectory : directory,
      }
    }
    case CAT: {
      await cat(directory, command);
      return {
        message: '',
        directory: directory,
      }
    }
    case ADD: {
      await add(directory, command);
      return {
        message: '',
        directory: directory,
      }
    }
    case RN: {
      await rn(directory, command);
      return {
        message: '',
        directory: directory,
      }
    }
    case CP: {
      await cp(directory, command);
      return {
        message: '',
        directory: directory,
      }
    }
    case MV: {
      await mv(directory, command);
      return {
        message: '',
        directory: directory,
      }
    }
    case RM: {
      await rm(directory, command);
      return {
        message: '',
        directory: directory,
      }
    }
  }

  return {
    message: '',
    directory: directory
  }
}

export { commandRunner };
