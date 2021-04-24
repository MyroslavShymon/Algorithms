<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Last name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="last-name">Last name</label>
      <md-input
        name="last-name"
        id="last-name"
        autocomplete="last-name"
        v-model.trim="lastName"
      />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ lastNameOut }}</span>
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
export default class LastNameInput extends Vue {
  public lastName = "";
  private declarated!: boolean;
  @Prop() private invalid!: invalid;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.lastName === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.lastName === "";
      return true;
    }
  }

  public get lastNameOut(): string {
    this.store.persons.lastName = this.lastName;
    return this.store.persons.lastName;
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
