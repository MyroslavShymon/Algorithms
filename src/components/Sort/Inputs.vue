<template>
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
</template>

<script lang="ts">
import { MutationNames } from "@/store/modules/users/types/actions-mutations-names-list";
import { Vue, Options } from "vue-class-component";

@Options({
  name: "Inputs",
})
export default class Inputs extends Vue {
  get firstName(): string {
    return this.$store.state.users.firstName;
  }
  set firstName(firstName: string) {
    this.$store.commit(MutationNames.SET_FIRSTNAME, firstName);
  }

  get lastName(): string {
    return this.$store.state.users.lastName;
  }
  set lastName(lastName: string) {
    this.$store.commit(MutationNames.SET_LASTNAME, lastName);
  }

  get email(): string {
    return this.$store.state.users.email;
  }
  set email(email: string) {
    this.$store.commit(MutationNames.SET_EMAIL, email);
  }

  get username(): string {
    return this.$store.state.users.username;
  }
  set username(username: string) {
    this.$store.commit(MutationNames.SET_USERNAME, username);
  }

  get age(): number {
    return this.$store.state.users.age;
  }
  set age(age: number) {
    this.$store.commit(MutationNames.SET_AGE, age);
  }
}
</script>
