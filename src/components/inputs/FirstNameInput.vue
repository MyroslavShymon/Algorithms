<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="First name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="first-name">First name</label>
      <md-input
        name="first-name"
        id="first-name"
        autocomplete="first-name"
        v-model.trim="firstName"
      />
      <!-- :disabled="sending" -->
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

// type invalid = { invalid: boolean };
@Component({
  components: {
    ValidationProvider,
  },
})
export default class FirstNameInput extends Vue {
  public firstName = "";
  private declarated!: boolean;
  // @Prop() private invalid!: invalid;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.firstName === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.firstName === "";
      return true;
    }
  }

  public get firstNameOut(): string {
    this.store.persons.firstName = this.firstName;
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
