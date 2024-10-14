import { dirname } from "node:path";

const up = (directory, command) => {
  if (directory === '/') return directory;
  return dirname(directory);
}

export { up };
