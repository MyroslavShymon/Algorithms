<template>
  <div class="p-d-flex p-jc-center">
    <Button
      label="Sort"
      class="p-button-primary p-mr-2"
      @click="sortUsers"
    ></Button>
    <Dropdown
      v-model="selectedSortingType"
      class="p-mr-2"
      :options="sortingTypes"
      optionLabel="name"
      placeholder="Select a sorting type"
    />
    <Dropdown
      v-model="selectedLang"
      class="p-mr-2"
      :options="languages"
      optionLabel="name"
      placeholder="Select lang to sort"
    />
    <Dropdown
      v-model="selectedField"
      class="p-mr-2"
      :options="fields"
      optionLabel="name"
      placeholder="Select field"
    />
    <Button
      label="Show graphic left"
      class="p-button-primary p-mr-2"
      @click="changeShowGraphicLeft"
    ></Button>
    <Button
      label="Save"
      class="p-button-primary p-mr-2"
      @click="saveUsers"
    ></Button>
    <Button
      label="Read"
      class="p-button-primary p-mr-2"
      @click="readUsers"
    ></Button>
    <Button
      label="Add user"
      class="p-button-primary p-mr-2"
      @click="addUser"
    ></Button>
    <Button
      label="Load random users"
      class="p-button-primary p-mr-2"
      @click="setUsers"
    ></Button>
    <InputNumber
      v-model="usersCount"
      mode="decimal"
      showButtons
      buttonLayout="horizontal"
      decrementButtonClass="p-button-primary"
      incrementButtonClass="p-button-primary"
      incrementButtonIcon="pi pi-plus"
      decrementButtonIcon="pi pi-minus"
      :min="0"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
// import { Prop } from "vue-property-decorator";

import {
  MutationNames,
  ActionNames,
} from "@/store/modules/users/types/actions-mutations-names-list";
import { IUser } from "@/store/modules/users/types/interfaces";
import ResultTable from "@/components/Sort/ResultTable.vue";

@Options({
  name: "Buttons",
  components: {
    ResultTable,
  },
  data() {
    return {
      usersCount: 0,

      selectedField: "",
      selectedLang: "",
      selectedSortingType: "",

      languages: [
        { name: "C++", code: "cpp" },
        { name: "TypeScript", code: "TypeScript" },
      ],
      fields: [
        { name: "First name", code: "firstName" },
        { name: "Last name", code: "lastName" },
        { name: "Email", code: "email" },
        { name: "Username", code: "username" },
        { name: "Age", code: "age" },
      ],
      sortingTypes: [
        { name: "Bubble sort", code: "bubbleSort" },
        { name: "Quick sort", code: "quickSort" },
        { name: "Default sort", code: "defaultSort" },
      ],
    };
  },
})
export default class Buttons extends Vue {
  usersCount!: number;

  private addUser() {
    this.$store.commit(MutationNames.ADD_USER, {
      firstName: this.$store.state.users.firstName,
      lastName: this.$store.state.users.lastName,
      email: this.$store.state.users.email,
      username: this.$store.state.users.username,
      age: this.$store.state.users.age,
    } as IUser);
    this.$store.state.users.firstName = "";
    this.$store.state.users.lastName = "";
    this.$store.state.users.email = "";
    this.$store.state.users.username = "";
    this.$store.state.users.age = 0;
  }
  private changeShowGraphicLeft() {
    this.$store.commit(
      MutationNames.SHOW_GRAPHIC,
      !this.$store.state.users.showGraphicLeft
    );
  }
  private saveUsers() {
    localStorage.users = JSON.stringify(this.$store.state.users.users);
  }
  private readUsers() {
    this.$store.state.users.users = JSON.parse(localStorage.users);
  }
  private async setUsers() {
    this.$store.state.users.users = await this.$store.dispatch(
      ActionNames.USER_REQUEST,
      this.usersCount
    );
  }
}
</script>
