import { GetterTree } from "vuex";
import { GettersType, StateType } from "./types";

export const getters: GetterTree<StateType, StateType> & GettersType = {
  doubledCounter: (state) => {
    return state.user;
  },
};
