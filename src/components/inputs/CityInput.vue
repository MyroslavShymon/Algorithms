<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="City name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="city">City name</label>
      <md-input name="city" id="city" autocomplete="city" v-model.trim="city" />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ cityNameOut }}</span>
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
export default class CityInput extends Vue {
  public city = "";
  private declarated!: boolean;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.city === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.city === "";
      return true;
    }
  }

  public get cityNameOut(): string {
    this.store.persons.city = this.city;
    return this.store.persons.city;
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
