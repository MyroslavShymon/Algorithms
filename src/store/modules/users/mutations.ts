import { MutationTree } from "vuex";

import { MutationNames } from "./types/actions-mutations-names-list";
import { MutationsType, StateType } from "./types";
import { IUser } from "./types/interfaces";

export const mutations: MutationTree<StateType> & MutationsType = {
  [MutationNames.ADD_USER](state, user: IUser) {
    state.users.push(user);
  },
  [MutationNames.SET_USER](state, payload: IUser[]) {
    state.users = payload;
  },
};
