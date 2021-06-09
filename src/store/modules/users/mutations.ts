import { MutationTree } from "vuex";

import { MutationNames } from "./types/actions-mutations-names-list";
import { MutationsType, StateType } from "./types";
import { IUser } from "./types/interfaces";

const Module = require("../../../../public/js/js_plumbing.js");

const loadWasm = new Promise((resolve) => {
  Module({
    onRuntimeInitialized() {
      resolve(this); // "this" is Module
    },
  });
});

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
  [MutationNames.BUBBLE_SORT](state, field: string) {
    // let swap, temp;
    // do {
    //   swap = false;
    //   for (let index = 0; index < state.users.length - 1; index++) {
    //     if (state.users[index][field] > state.users[index + 1][field]) {
    //       temp = state.users[index];
    //       state.users[index] = state.users[index + 1];
    //       state.users[index + 1] = temp;
    //       swap = true;
    //     }
    //   }
    // } while (swap == true);
    loadWasm.then((instance: any): void => {
      console.log(instance._Add(2, 3));

      // this.result = instance._Add(1, 2);
    });
  },
};
