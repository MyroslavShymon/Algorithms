import { createStore } from "vuex";
import { users } from "./modules/users/index";

export const store = createStore({
  modules: { users },
});
