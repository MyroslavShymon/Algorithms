<template>
  <validation-provider
    v-slot="{ errors, valid }"
    :name="transformDataToValid('gap')"
    rules="required|max:20"
  >
    <md-field
      :state="valid"
      :class="{
        'md-invalid': readClasses,
      }"
    >
      <label :for="dataToValid">{{ transformDataToValid("gap") }}</label>
      <md-input
        :name="dataToValid"
        :id="dataToValid"
        :autocomplete="dataToValid"
        :v-model="transformDataToValid('camelCase')"
      />
      <!-- :disabled="sending" -->
      <span style="display: none">{{ textInputOut }}</span>
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
// type TFields = "firstName" | "lastName";
@Component({
  components: {
    ValidationProvider,
  },
})
export default class TextInput extends Vue {
  // private fieldModelName: string = "";
  // created() {
  //   this.fieldModelName = this.transformDataToValid("camelCase");
  // }
  public [this.transformDataToValid("camelCase")]!: string;
  private declarated!: boolean;
  @Prop() private invalid!: invalid;
  @Prop() private dataToValid!: string;

  private helpTransformText(word: number): string {
    return [...this.dataToValid.split("-")[word]]
      .filter((_: string, index: number): boolean => index !== 0)
      .join("");
  }
  public transformDataToValid(style: string): string {
    let teansformedData: string;

    switch (style) {
      case "camelCase":
        return (
          this.dataToValid.split("-")[0] +
          this.dataToValid.split("-")[1][0].toUpperCase() +
          this.helpTransformText(1)
        );
      case "gap":
        return (
          this.dataToValid.split("-")[0][0].toUpperCase() +
          this.helpTransformText(0) +
          " " +
          this.dataToValid.split("-")[1]
        );
      case "decorated":
        return (
          this.dataToValid.split("-")[0][0].toUpperCase() +
          this.helpTransformText(0) +
          " " +
          this.dataToValid.split("-")[1] +
          ": "
        );
      default:
        return this.dataToValid;
    }
  }

  public store: MyStore = useStore(this.$store);

  // private get fieldModelNameGetting(): string {
  //   return this.fieldModelName;
  // }

  private get readClasses(): boolean {
    // console.log('["this.fieldModelNameGetting"]', this.fieldModelName);

    if (
      this.declarated === undefined &&
      this[this.transformDataToValid("camelCase")] === ""
    ) {
      this.declarated = true;
      return false;
    } else if (
      this.declarated === true &&
      this[this.transformDataToValid("camelCase")] === ""
    ) {
      return true;
    } else return this.invalid.invalid;
  }

  public get textInputOut(): string {
    this.store.persons[this.transformDataToValid("camelCase")] = this[
      this.transformDataToValid("camelCase")
    ];
    return this.store.persons[this.transformDataToValid("camelCase")];
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
