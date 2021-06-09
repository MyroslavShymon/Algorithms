import { Mutation } from "vuex";
export interface MutationTree<S> {
  [key: number]: Mutation<S>;
}
