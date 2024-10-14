import { homedir } from 'node:os'

import { parseArgs } from './modules/pars-args.js'
import { logger } from "./modules/logger.js";
import { commandMatcher } from "./modules/command-matcher.js";
import { commandRunner } from './modules/command-runner.js'
import { COMMANDS } from "./command-list.js";

export default (process) => {
  const {argv, stdin, stdout} = process;
  let directory = homedir();
  const applicationSettings = parseArgs((argv), ['username']);
  logger(`Welcome to the File Manager, ${applicationSettings.username}`);
  logger(`${directory}: `);

  stdin.on("readable", async () => {
    let chunk;
    while ((chunk = stdin.read()) !== null) {
      const command = commandMatcher(COMMANDS, chunk.toString())
      if (command !== null) {
        const result = await commandRunner(directory, command);
        directory = result.directory;
        if(result.message) stdout.write(`\n${result.message}\n`);
      }
      stdout.write(`${directory} `);
    }
  });
  stdin.on("error", (err) => procteess.stderr.write(err.message));

  process.on('SIGINT', () => {
    stdout.write(`\nThank you for using File Manager, ${applicationSettings.username}, goodbye!\n`);
    process.exit(0);
  });
};
