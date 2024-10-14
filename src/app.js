import { parseArgs } from './modules/pars-args.js'
import {logger} from "./modules/logger.js";
import {commandMatcher} from "./modules/command-matcher.js";
import {COMMANDS} from "./command-list.js";

export default (args, input, output) => {
  const applicationSettings = parseArgs((args), ['username']);
  logger(`Welcome to the File Manager, ${applicationSettings.username}`);

  input.on("readable", () => {
    let chunk;
    while ((chunk = input.read()) !== null) {
      const command = commandMatcher(COMMANDS, chunk.toString())

      if (command !== null) {
        output.write(`command: ${command.command}\n`);
        output.write(`name: ${command.name}\n`);
        output.write(`params: ${command.params}\n`);
        output.write(`value: ${command.value}\n`);
        output.write(`========================\n`);
      }
    }
  });
  input.on("error", (err) => procteess.stderr.write(err.message));
};
