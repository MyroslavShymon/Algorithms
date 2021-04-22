<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="firstName"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      label="First name: "
      :class="{
        'md-invalid': readClasses,
      }"
    >
      <!-- (invalid && readClasses.invalid) === true ? invalid : false, -->
      <label for="first-name">First name</label>
      <md-input
        name="first-name"
        id="first-name"
        autocomplete="family-name"
        v-model="firstName"
        :disabled="sending"
      />{{ readClasses }}|{{ invalid }}
      <!-- {{ invalid }}|{{ !readClasses.invalid }}|{{
        invalid || !readClasses.invalid
      }}|{{ (invalid || !readClasses.invalid) === true ? true : false }} -->
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

type invalid = { invalid: boolean };
@Component({
  components: {
    ValidationProvider,
  },
})
export default class FirstNameInput extends Vue {
  public firstName = "";
  private declarated!: boolean;
  @Prop() private invalid!: invalid;

  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.firstName === "") {
      this.declarated = true;
      return false;
    } else if (this.declarated === true && this.firstName === "") {
      return true;
    } else return this.invalid.invalid;
  }

  public get firstNameOut() {
    this.store.persons.name = this.firstName;
    console.log(this.store.persons.name);
    return this.firstName;
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
