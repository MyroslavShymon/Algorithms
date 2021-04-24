<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Country name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="country">Country name</label>
      <md-input
        name="country"
        id="country"
        autocomplete="country"
        v-model.trim="country"
      />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ countryNameOut }}</span>
    </md-field>
    <div :state="valid">
      <span class="error" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </span>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";

@Component({
  components: {
    ValidationProvider,
  },
})
export default class countryInput extends Vue {
  public country = "";
  private declarated!: boolean;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.country === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.country === "";
      return true;
    }
  }

  public get countryNameOut(): string {
    this.store.persons.country = this.country;
    return this.store.persons.country;
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
