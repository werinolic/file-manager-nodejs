import { logger } from './logger.js'
import {ERROR} from "../common/constants.js";

const parseArgs =  (argv, listOfRequiredParams = []) => {
  const result = {};

  if(argv) {
    argv.forEach((elem) => {
      if (elem.startsWith("--")) {
        const pair = elem.slice(2).split('=')
        if (pair.length === 2 && typeof pair[0] === "string" && typeof pair[1] === 'string') {
          result[pair[0]] = pair[1];
        } else {
          const message = 'argv element is not valid';
          logger(message, ERROR);
        }
      }
    });
  }

  listOfRequiredParams.forEach(item => {
    if (result[item] === undefined) {
      const message = `Please, provide a "${item}" it's required parameter`
      logger(message, ERROR);
      throw message;
    }
  })

  return result;
};

export { parseArgs }