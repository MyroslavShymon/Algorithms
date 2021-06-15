import { ActionContext } from "vuex";

import { state } from "../state";
import { MutationNames, ActionNames } from "./actions-mutations-names-list";
import { IUser } from "./interfaces";

// State types and interfaces
export type StateType = typeof state;

// Mutations types and interfaces
export type MutationsType<S = StateType> = {
  [MutationNames.ADD_USER](state: S, user: IUser): void;
  [MutationNames.SET_USER](state: S, payload: IUser[]): void;
  [MutationNames.SET_FIRSTNAME](state: S, firstName: string): void;
  [MutationNames.SET_LASTNAME](state: S, lastName: string): void;
  [MutationNames.SET_EMAIL](state: S, email: string): void;
  [MutationNames.SET_USERNAME](state: S, username: string): void;
  [MutationNames.SET_AGE](state: S, age: number): void;
  [MutationNames.SET_ERROR](state: S, error: string): void;
  [MutationNames.SET_SPEADS](state: S): void;
  [MutationNames.BUBBLE_SORT](
    state: S,
    payload: { field: string; language: string }
  ): void;
};

// Actions types and interfaces
type AugmentedActionContext = {
  commit<K extends keyof MutationsType>(
    key: K,
    payload: Parameters<MutationsType[K]>[1]
  ): ReturnType<MutationsType[K]>;
} & Omit<ActionContext<StateType, StateType>, "commit">;

export interface ActionsType {
  // [ActionNames.GET_COUTNER_ASYNC]({
  //   commit,
  // }: AugmentedActionContext): Promise<number>;
  [ActionNames.USER_REQUEST](
    { commit }: AugmentedActionContext,
    countOfUsers: number
  ): Promise<IUser[]> | string;
}

// Getters types and interfaces
export type GettersType = {
  getCppSpeads(state: StateType): number[];
  getWasmSpeads(state: StateType): number[];
  getTSSpeads(state: StateType): number[];
};
