<template>
  <div class="home"></div>
  <div class="p-d-flex p-flex-column">
    <div class="p-d-flex p-jc-center">
      <div class="p-field">
        <span class="p-float-label p-input-icon-right">
          <i class="pi pi-search" style="cursor:pointer" />
          <InputText
            id="inputtext-right"
            type="text"
            v-model="valueIconRight"
          />
          <label for="inputtext-right">Person to search...</label>
        </span>
      </div>
    </div>
    <div class="p-d-flex p-jc-center p-my-3">
      <span class="p-float-label p-mr-2">
        <InputText id="firstName" type="text" v-model="firstName" />
        <label for="firstName">First name</label>
      </span>
      <span class="p-float-label p-mr-2">
        <InputText id="lastName" type="text" v-model="lastName" />
        <label for="lastName">Last name</label>
      </span>
      <span class="p-float-label p-mr-2">
        <InputText id="email" type="text" v-model="email" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label p-mr-2">
        <InputText id="username" type="text" v-model="username" />
        <label for="username">Username</label>
      </span>
      <span class="p-float-label">
        <InputNumber id="age" type="text" v-model="age" />
        <label for="age">Age</label>
      </span>
    </div>
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
        @click="showGraphicLeft = !showGraphicLeft"
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
  </div>
  <div class="p-d-flex p-mt-2">
    <div v-show="showGraphicLeft" class="aaaaaaaaaaaaaa" style="flex-grow:1">
      Graphic
    </div>
    <div
      class="p-jc-end"
      :class="{ 'p-d-block': !showGraphicLeft, 'p-d-flex': showGraphicLeft }"
      style="flex-grow:1"
    >
      <DataTable
        :value="users"
        :paginator="true"
        :rows="10"
        showGridlines
        class="p-datatable-sm"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="usersToShow"
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        <template #header>
          USERS
        </template>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="age" header="Age"></Column>
      </DataTable>
    </div>
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
@Options({
  name: "Home",
  data() {
    return {
      usersCount: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      age: 0,
      selectedField: "",
      selectedLang: "",
      selectedSortingType: "",
      showGraphicLeft: false,
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
export default class Home extends Vue {
  users: IUser[] = [];
  usersCount!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  username!: string;
  age!: number;

  private get usersToShow(): number[] {
    if (this.users.length <= 10) {
      return [this.users.length];
    }
    if (this.users.length <= 20) {
      return [10, 20];
    }
    return [10, 20, this.users.length];
  }
  private addUser() {
    this.$store.commit(MutationNames.ADD_USER, {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      age: this.age,
    } as IUser);
  }
  private saveUsers() {
    localStorage.users = JSON.stringify(this.users);
  }
  private readUsers() {
    this.users = JSON.parse(localStorage.users);
  }
  private async setUsers() {
    this.users = await this.$store.dispatch(
      ActionNames.USER_REQUEST,
      this.usersCount
    );
    console.log("USERS HOme", this.users);
  }
  public async mounted() {
    if (JSON.stringify(this.$store.state.users.users) === "[]") {
      this.users = await this.$store.dispatch(ActionNames.USER_REQUEST, 20);
      console.log("Mounted users", this.$store.state.users.users);
    }
    this.users = this.$store.state.users.users;
  }
}
</script>
