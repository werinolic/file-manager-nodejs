import { logger } from './logger.js'
import {ERROR} from "../common/constants.js";

const parseArgs =  (argv, listOfRequiredParams = []) => {
  const result = {};

  if(argv) {
    argv.forEach((elem) => {
      if (elem.startsWith("--")) {
        if (elem.includes('=')) {
          const pair = elem.slice(2).split('=')
          if (pair.length === 2 && typeof pair[0] === "string" && typeof pair[1] === 'string') {
            result[pair[0]] = pair[1];
          } else {
            logger('argv element is not valid', ERROR);
          }
        } else {
          const key = elem.slice(2);
          if (typeof key === "string") {
            result[key] = key;
          } else {
            logger('argv element is not valid', ERROR);
          }
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