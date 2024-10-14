import {UP, LS, CD} from "../command-list.js";
import { up } from './commands/up.js';
import { ls } from './commands/ls.js';
import { cd } from './commands/cd.js';

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

  }

  return {
    message: '',
    directory: directory
  }
}

export { commandRunner };
