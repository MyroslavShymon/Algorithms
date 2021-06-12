import { MutationTree } from "vuex";

import { MutationNames } from "./types/actions-mutations-names-list";
import { MutationsType, StateType } from "./types";
import { IUser } from "./types/interfaces";
import { bubbleSort } from "./functions/index";
// import { state } from "./state";
const Module = require("../../../../public/js/js_plumbing.js");
const JSON5 = require("json5");

//state.users
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
  [MutationNames.BUBBLE_SORT](
    state,
    payload: { field: string; language: string }
  ) {
    switch (payload.language) {
      case "cpp": {
        // let JSON_str,
        //   newJSON,
        //   time_bubble = 1;
        loadWasm.then((instance: any): void => {
          let time: number = performance.now();
          instance._sort(state.users.length);
          time = performance.now() - time;
          state.sortsTime.Bubble[1].push(time);

          console.log("WASM bubble time", time);

          console.log("JSON_str", JSON.parse(JSON.stringify(state.JSON_str)));
          // state.users = JSON.parse(JSON.stringify(state.JSON_str));
          state.users = JSON5.parse(state.JSON_str);
          console.log("state.JSON_str.replaced", state.JSON_str);

          // localStorage.usssers =
          // state.users = JSON.parse(JSON_str);
        });
        break;
      }
      case "ts": {
        let time: number;
        [state.users, time] = bubbleSort(state.users, payload.field);
        state.sortsTime.Bubble[2].push(time);
        console.log("state.sortsTime", state.sortsTime);
        break;
      }
      default:
        let time: number;
        [state.users, time] = bubbleSort(state.users, payload.field);
    }
  },
};
function JSON_str(arg0: string, JSON_str: any) {
  throw new Error("Function not implemented.");
}
