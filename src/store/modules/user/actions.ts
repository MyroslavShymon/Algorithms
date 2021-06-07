import { ActionTree } from "vuex";
import { ActionsType, StateType } from "./types";
import {
  ActionNames,
  MutationNames,
} from "./types/actions-mutations-names-list";

export const actions: ActionTree<StateType, StateType> & ActionsType = {
  async [ActionNames.REQUEST_FOR_USERS]({ commit }) {
    const response = await fetch(`https://randomuser.me/api?results=${4}`);
    const object = await response.json();
    const persons = object.results;
    console.log("persons", persons);
    commit(MutationNames.SET_USER, persons);
  },
};
