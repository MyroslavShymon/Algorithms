<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="Street name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="street">Street name</label>
      <md-input
        name="street"
        id="street"
        autocomplete="street"
        v-model.trim="street"
      />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ streetNameOut }}</span>
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
export default class streetInput extends Vue {
  public street = "";
  private declarated!: boolean;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.street === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.street === "";
      return true;
    }
  }

  public get streetNameOut(): string {
    this.store.persons.streetName = this.street;
    return this.store.persons.streetName;
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
