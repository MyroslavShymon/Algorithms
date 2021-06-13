import { IUser } from "./types/interfaces";

export const state = {
  // counter: 0,
  showGraphicLeft: false,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  age: 0,
  users: [] as IUser[],
  sortsTime: {
    Bubble: [[], [], []],
    Quick: [[], [], []],
    Default: [[], [], []],
  } as {
    Bubble: number[][];
    Quick: number[][];
    Default: number[][];
  },
  JSON_str: "",
  error: "",
};
