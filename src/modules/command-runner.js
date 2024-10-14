import {UP, LS, CD, CAT, ADD, RN, CP, MV, RM, HASH, COMPRESS, DECOMPRESS, OS} from "../command-list.js";
import { up } from './commands/up.js';
import { ls } from './commands/ls.js';
import { cd } from './commands/cd.js';
import { cat } from "./commands/cat.js";
import { add } from "./commands/add.js";
import { rn } from "./commands/rn.js";
import { cp } from "./commands/cp.js";
import { mv } from "./commands/mv.js";
import { rm } from "./commands/rm.js";
import {hash} from "./commands/hash.js";
import {compress} from "./commands/compress.js";
import {decompress} from "./commands/decompress.js";
import { os } from "./commands/os.js";

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
      const message = await ls(directory);
      return {
        message: message,
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
      const message = await cp(directory, command);
      return {
        message: message,
        directory: directory,
      }
    }
    case MV: {
      const message = await mv(directory, command);
      return {
        message: message,
        directory: directory,
      }
    }
    case RM: {
      const message = await rm(directory, command);
      return {
        message: message,
        directory: directory,
      }
    }
    case HASH: {
      const message = await hash(directory, command);
      return {
        message: message,
        directory: directory,
      }
    }
    case COMPRESS: {
      const message = await compress(directory, command);
      return {
        message: message,
        directory: directory,
      }
    }
    case DECOMPRESS: {
      const message = await decompress(directory, command);
      return {
        message: message,
        directory: directory,
      }
    }
    case OS: {
      const message = os(directory, command);
      return {
        message: message,
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
