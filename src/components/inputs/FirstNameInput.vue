<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="First name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': resultClass && invalid,
      }"
    >
      <label for="first-name">First name</label>
      <md-input
        name="first-name"
        id="first-name"
        autocomplete="first-name"
        v-model="firstName"
      />
      <span style="display: none">{{ firstNameOut }}</span>
    </md-field>
    <div :state="valid">
      <span class="error" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </span>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import ProjectMixin from "@/mixins/ProjectMixin";

type invalid = { invalid: boolean };
@Component({
  components: {
    ValidationProvider,
  },
})
export default class FirstNameInput extends Mixins(ProjectMixin) {
  public firstName = "";
  public resultClass = false;
  @Prop() private invalid!: invalid;
  public store: MyStore = useStore(this.$store);

  public get firstNameOut(): string {
    this.store.persons.firstName = this.firstName;
    this.resultClass = this.readClasses;
    return this.store.persons.firstName;
  }
}
</script>

<style scoped>
.md-field {
  margin: 4px 0 4px;
}
.error {
  color: #ff5252;
}
</style>
