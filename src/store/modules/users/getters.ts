import { GetterTree } from "vuex";
import { GettersType, StateType } from "./types";

export const getters: GetterTree<StateType, StateType> & GettersType = {
  getCppSpeads: (state) => {
    return state.cppSpeads;
  },
  getWasmSpeads: (state) => {
    return state.wasmSpeads;
  },
  getTSSpeads: (state) => {
    return state.tsSpeads;
  },
};
