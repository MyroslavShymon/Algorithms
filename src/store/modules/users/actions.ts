import { ActionTree } from "vuex";
import { ActionsType, StateType } from "./types";
import {
  ActionNames,
  MutationNames,
} from "./types/actions-mutations-names-list";
import { IUser } from "./types/interfaces";

export const actions: ActionTree<StateType, StateType> & ActionsType = {
  // [ActionNames.GET_COUTNER_ASYNC]({ commit }) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const data = 256;
  //       commit(MutationNames.SET_COUNTER, data);
  //       resolve(data);
  //     }, 500);
  //   });
  // },
  async [ActionNames.USER_REQUEST]({ commit }, countOfUsers) {
    const response = await fetch(
      `https://randomuser.me/api?results=${countOfUsers}`
    );
    const usersParesed = await response.json();
    const usersToTransform: [] = usersParesed.results;
    console.log("usersToTransform", usersToTransform);

    let users: IUser[] = usersToTransform.map((user: any) => {
      return {
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        age: user.dob.age,
      };
    });

    commit(MutationNames.SET_USER, users);
    return users;
  },
};
