import { IUser } from "./types/interfaces";

export const state = {
  // counter: 0,
  showGraphicLeft: false,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  age: 0,
  field: "",
  language: "",
  users: [] as IUser[],
  sortsTime: {
    Bubble: [[], [], []],
    Quick: [[3, 5, 7], [3, 6], [1]],
    Default: [[4], [7], [9, 10]],
  } as {
    Bubble: number[][];
    Quick: number[][];
    Default: number[][];
  },
  JSON_str: "",
  error: "",
  sortType: "",
  cppSpeads: [] as number[],
  wasmSpeads: [] as number[],
  tsSpeads: [] as number[],
};
