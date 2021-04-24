<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Years registered"
    rules="required|numeric"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="yearsRegistered">Years registered:</label>
      <md-input
        name="yearsRegistered"
        id="yearsRegistered"
        autocomplete="yearsRegistered"
        v-model="yearsRegistered"
        required
        placeholder="Enter years registered"
      />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ yearsRegisteredNameOut }}</span>
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
export default class yearsRegisteredInput extends Vue {
  public yearsRegistered = 1;
  public validYearsRegistered = false;
  private declarated!: boolean;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.yearsRegistered === 0) {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true;
      return true;
    }
  }

  public get yearsRegisteredNameOut(): number {
    this.store.persons.yearsRegistered = this.yearsRegistered;
    this.store.persons.validYearsRegistered = this.validYearsRegistered;
    return this.store.persons.yearsRegistered;
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
