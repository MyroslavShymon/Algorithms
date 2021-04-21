<template>
  <validation-provider
    v-slot="{ errors, valid }"
    name="firstName"
    rules="required|max:20"
  >
    {{ invalid }} | {{ readClasses }}
    <md-field
      label="First name: "
      :class="{
        'md-invalid':
          (readClasses.invalid && invalid) === true ? invalid : false,
      }"
    >
      <!--  -->
      <label for="first-name">First name</label>
      <md-input
        name="first-name"
        id="first-name"
        autocomplete="family-name"
        v-model="firstName"
        :disabled="sending"
      />
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

type classes = { invalid: boolean };
@Component({
  components: {
    ValidationProvider,
  },
})
export default class FirstNameInput extends Vue {
  private firstName = "";
  private classes!: classes;
  private get readClasses(): classes {
    let classTo: classes = { invalid: true };
    if (this.firstName === "") {
      classTo = this.classes = {
        invalid: false,
      };
    }
    return classTo;
  }
}
</script>
