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
  if(command.value !== '' &&  pattern.value === false) {
    validationsErrors.push('Value should be empty');
  }
  if(command.params.length !== pattern.params.length) {
    validationsErrors.push('Required params are missing');
  }
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
    logger(`command ${name} are not valid`, ERROR)
    logger(validationErrors. join('; '), ERROR)
  }

  return commandObject;
}