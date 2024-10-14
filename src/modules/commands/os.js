import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

const getEOL = () => {
  return `EOL: ${JSON.stringify(EOL)}\n`;
}
const getCPUs = () => {
  const cpuInfo = cpus();
  let result =  `Total CPUs: ${cpuInfo.length}\n`;
  cpuInfo.forEach((cpu, index) => {
    result += `CPU ${index + 1}: Model: ${cpu.model}, Speed: ${(cpu.speed / 1000).toFixed(2)} GHz\n`;
  });
  return result;
}
const getHomeDir = () => {
  return `homedir: ${homedir()}\n`;
}

const getUsername = () => {
  const { username } = userInfo();
  return `username ${username}\n`;
}

const getArchitecture = () =>  {
  return `architecture: ${arch()}\n`
}

export const os = (directory, command) => {
  const { params } = command;
  let result = '';
  if (params['EOL']) {
    result += getEOL();
  }
  if (params['cpus']) {
    result += getCPUs();
  }

  if (params['homedir']) {
    result += getHomeDir();
  }
  if (params['username']) {
    result += getUsername();
  }
  if (params['architecture']) {
    result += getArchitecture();
  }

  return result;
}
