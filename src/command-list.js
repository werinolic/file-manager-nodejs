export const UP = 'up';
export const CD = 'cd';
export const LS = 'ls';
export const CAT = 'cat';
export const ADD = 'add';
export const RN = 'rn';
export const CP = 'cp';
export const MV = 'mv';
export const RM = 'rm';
export const HASH = 'hash';
export const COMPRESS = 'compress';
export const DECOMPRESS = 'decompress';
export const OS = 'os';


export const COMMANDS = [
  {
    name: UP,
    value: 0,
    params: [],
  },
  {
    name: LS,
    value: 0,
    params: [],
  },
  {
    name: CD,
    value: 1,
    params: [],
  },
  {
    name: CAT,
    value: 1,
    params: [],
  },
  {
    name: ADD,
    value: 1,
    params: [],
  },
  {
    name: RN,
    value: 2,
    params: [],
  },
  {
    name: CP,
    value: 2,
    params: [],
  },
  {
    name: MV,
    value: 2,
    params: [],
  },
  {
    name: RM,
    value: 1,
    params: [],
  },
  {
    name: HASH,
    value: 1,
    params: [],
  },
  {
    name: COMPRESS,
    value: 2,
    params: [],
  },
  {
    name: DECOMPRESS,
    value: 2,
    params: [],
  },
  {
    name: OS,
    value: 0,
    params: [
      'EOL','cpus','homedir', 'username', 'architecture'
    ],
  },
];