<template>
  <div class="p-d-flex p-flex-column">
    <div class="p-d-flex p-jc-center">
      <div class="p-field">
        <span class="p-float-label p-input-icon-right">
          <i class="pi pi-search" style="cursor:pointer" />
          <InputText id="inputtext-right" type="text" v-model="search" />
          <label for="inputtext-right">Person to search...</label>
        </span>
      </div>
    </div>
    <div class="p-d-flex p-jc-center p-mb-3">
      <Inputs />
    </div>
    <Buttons />
  </div>
  <div v-if="this.$store.state.users.error" class="p-mt-3">
    {{ this.$store.state.users.error }}
  </div>
  <ResultTable v-else :users="this.$store.state.users.users" />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

import {
  MutationNames,
  ActionNames,
} from "@/store/modules/users/types/actions-mutations-names-list";
import ResultTable from "@/components/Sort/ResultTable.vue";
import Buttons from "@/components/Sort/Buttons.vue";
import Inputs from "@/components/Sort/Inputs.vue";

@Options({
  name: "Sorts",
  data() {
    return {
      search: "",
    };
  },
  components: {
    ResultTable,
    Buttons,
    Inputs,
  },
})
export default class Sorts extends Vue {
  public async mounted() {
    if (JSON.stringify(this.$store.state.users.users) === "[]") {
      this.$store.state.users.users = await this.$store.dispatch(
        ActionNames.USER_REQUEST,
        20
      );
    }
  }
}
</script>
