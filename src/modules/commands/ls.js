import {readdir} from "node:fs/promises";
import {logger} from "../logger.js";
import {ERROR, WARN} from "../../common/constants.js";

function prepareTableToPrint(files) {
  let result = '';
  if (!Array.isArray(files) || files.length === 0) {
    logger("No files to display.", WARN);
    return;
  }
  const headers = ["Name", "Type"];

  const nameWidth = Math.max(
    ...files.map(file => file.name.length),
    headers[0].length
  );
  const typeWidth = Math.max(
    ...files.map(file => file.type.length),
    headers[1].length
  );
  const pad = (str, length) => {
    if (str.length < length) {
      return str + ' '.repeat(length - str.length);
    }
    return str;
  };
  const separator = `|-${'-'.repeat(nameWidth)}-|-${'-'.repeat(typeWidth)}-|`;
  const header = `| ${pad(headers[0], nameWidth)} | ${pad(headers[1], typeWidth)} |`;
  result = separator + '\n' + header + '\n'+ separator + '\n';

  // Print each file row
  files.forEach(file => {
    const row = `| ${pad(file.name, nameWidth)} | ${pad(file.type, typeWidth)} |`;
    result += row + '\n';
  });

  result += separator + '\n';

  return result;
}

export const ls = async (directory) => {
  try {
    const items = await readdir(directory, { withFileTypes: true });
    const data = items
      .map((item) => ({ name: item.name, type: item.isDirectory() ? 'directory' : 'file' }), '')
      .sort((a, b) => a.type < b.type ? (a.type === b.type ? 0 : -1) : 1 );
    return prepareTableToPrint(data);
  } catch (error) {
    logger(`Error reading directory: ${error.message}`, ERROR);
  }
};


