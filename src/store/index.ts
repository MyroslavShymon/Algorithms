import { createStore } from "vuex";
import { user } from "./modules/user/index";

export const store = createStore({
  modules: { user },
});
