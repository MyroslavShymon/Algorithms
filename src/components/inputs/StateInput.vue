<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="State name"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses && !valid,
      }"
    >
      <label for="state">State name</label>
      <md-input name="state" id="state" autocomplete="state" v-model="state" />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ stateNameOut }}</span>
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
export default class stateInput extends Vue {
  public state = "";
  private declarated!: boolean;
  public store: MyStore = useStore(this.$store);

  private get readClasses(): boolean {
    if (this.declarated === undefined && this.state === "") {
      this.declarated = true;
      return false;
    } else {
      this.declarated === true && this.state === "";
      return true;
    }
  }

  public get stateNameOut(): string {
    this.store.persons.state = this.state;
    return this.store.persons.state;
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
