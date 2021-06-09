import { MutationTree } from "vuex";

import { MutationNames } from "./types/actions-mutations-names-list";
import { MutationsType, StateType } from "./types";
import { IUser } from "./types/interfaces";

export const mutations: MutationTree<StateType> & MutationsType = {
  [MutationNames.SHOW_GRAPHIC](state, showGraphicResponse: boolean) {
    state.showGraphicLeft = showGraphicResponse;
  },
  [MutationNames.ADD_USER](state, user: IUser) {
    state.users.push(user);
  },
  [MutationNames.SET_USER](state, payload: IUser[]) {
    state.users = payload;
  },
  [MutationNames.SET_FIRSTNAME](state, firstName: string) {
    state.firstName = firstName;
  },
  [MutationNames.SET_LASTNAME](state, lastName: string) {
    state.lastName = lastName;
  },
  [MutationNames.SET_EMAIL](state, email: string) {
    state.email = email;
  },
  [MutationNames.SET_USERNAME](state, username: string) {
    state.username = username;
  },
  [MutationNames.SET_AGE](state, age: number) {
    state.age = age;
  },
};
