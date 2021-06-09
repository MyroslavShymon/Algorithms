import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { ActionsType, GettersType, MutationsType, StateType } from "./types";

export const users: Module<StateType, any> = {
  state,
  getters,
  mutations,
  actions,
};

export type Store = Omit<
  VuexStore<StateType>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof MutationsType,
    P extends Parameters<MutationsType[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<MutationsType[K]>;
} & {
  dispatch<K extends keyof ActionsType>(
    key: K,
    payload: Parameters<ActionsType[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsType[K]>;
} & {
  getters: {
    [K in keyof GettersType]: ReturnType<GettersType[K]>;
  };
};
