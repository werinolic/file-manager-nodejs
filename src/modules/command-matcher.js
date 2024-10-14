import { logger } from "./logger.js";
import {ERROR} from "../common/constants.js";
import {parseArgs} from "./pars-args.js";

const commandValidator = (pattern, command) => {
  const validationsErrors = [];
  if (command.name !== pattern.name) {
    validationsErrors.push('Name are not equal to pattern name');
  }
  if(command.value === undefined && pattern.value === true) {
    validationsErrors.push('The value are missing');
  }
  if(command.value !== undefined &&  pattern.value === false) {
    validationsErrors.push('Value should be empty');
  }
  pattern.params.forEach(item => {
    if (command.params[item] === undefined) {
      const message = `Please, provide a "${item}" it's required parameter`
      logger(message, ERROR);
      throw message;
    }
  })
  return validationsErrors;
}

export const commandMatcher = (COMMANDS, command) => {
  const params = parseArgs(command.match(/--\S+/g))
  const [name, value] = command.replace(/--\S+\s*/g, '').trim().split(' ');
  const commandObject = { name, value, params, command};

  const commandPattern = COMMANDS.find(item => item.name === name);
  if (!commandPattern) {
    logger(`command ${name} doesnt exist in the list of available commands`, ERROR);
    return null;
  }

  const validationErrors = commandValidator(commandPattern, commandObject)
  if(validationErrors.length !== 0){
    logger(validationErrors. join('; '), ERROR);
    return null;
  }

  return commandObject;
}