<template>
  <div class="wrapper">
    <div class="data-wrapper">
      <validation-observer v-slot="{ invalid }">
        <form class="md-layout" @submit.prevent="validatePerson">
          <FirstNameInput />
          <LastNameInput />
          <CityInput />
          <CountryInput />
          <StateInput />
          <StreetNameInput />
          <EmailInput />
          <StreetNumberInput />
          <YearsRegisteredInput />
          <md-button
            type="submit"
            class="md-raised md-primary"
            variant="success"
            :disabled="invalid && btnShow"
            >Create person</md-button
          >
        </form>
      </validation-observer>
      <!-- <Chart :spead="avarageSpeads" v-if="isHidden"></Chart>
      <div>
        <h2>{{ chosingSortText }}</h2>
        <form class="form" action="" @submit.prevent="add">
          <md-field>
            <label>Type here surname!</label>
            <md-input v-model="surname" required></md-input>
            <span class="md-error">There is an error</span>
            <span class="md-helper-text">Surname</span>
          </md-field>
          <md-field>
            <label>Type here group!</label>
            <md-input v-model="group" required></md-input>
            <span class="md-error">There is an error</span>
            <span class="md-helper-text">Group</span>
          </md-field>
          <md-field>
            <label for="sort">Sort</label>
            <input type="text" v-model="sort" style="display: none" />
            <md-select v-model="sort" name="sort" id="sort">
              <md-option value="Bubble">Bubble sort</md-option>
              <md-option value="Shake">Shake sort</md-option>
              <md-option value="Selection">Selection sort</md-option>
              <md-option value="Insertion">Insertion sort</md-option>
              <md-option value="Shell">Shell sort</md-option>
              <md-option value="Quick">Quick sort</md-option>
              <md-option value="Pyramidal">Pyramidal sort</md-option>
              <md-option value="Default">Default sort</md-option>
            </md-select>
            <span class="md-error">The Sort is required</span>
          </md-field>
          <md-switch v-model="boolean" class="md-primary"
            >Surname or Group</md-switch
          >
          <textarea name="" id="" cols="30" rows="10" v-model="test"></textarea>

          <div>
            <md-button class="md-raised md-primary" v-on:click="testAdd"
              >Test</md-button
            >
            <md-button class="md-raised md-primary" v-on:click="chosingSort"
              >Sort</md-button
            >
            <md-button class="md-raised md-primary" v-on:click="save"
              >Save</md-button
            >
            <md-button class="md-raised md-primary" v-on:click="read"
              >Read</md-button
            >
            <md-button class="md-raised md-primary" type="submit"
              >Add</md-button
            >
            <md-button
              class="md-raised md-primary"
              v-on:click="isHidden = !isHidden"
              >Show graphik</md-button
            >
          </div>
        </form>
      </div> -->
    </div>
    <PersonsTable :persons="persons" />
  </div>
</template>

<script lang="ts">
import FirstNameInput from "../components/inputs/FirstNameInput.vue";
import LastNameInput from "../components/inputs/LastNameInput.vue";
import CityInput from "../components/inputs/CityInput.vue";
import CountryInput from "../components/inputs/CountryInput.vue";
import StateInput from "../components/inputs/StateInput.vue";
import StreetNameInput from "../components/inputs/StreetNameInput.vue";
import EmailInput from "../components/inputs/EmailInput.vue";
import StreetNumberInput from "../components/inputs/StreetNumberInput.vue";
import YearsRegisteredInput from "../components/inputs/YearsRegisteredInput.vue";

import { Component, Vue } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store/store";
import Person from "@/store/modules/person";
import PersonsTable from "@/components/PersonsTable.vue";
import { extend, setInteractionMode, ValidationObserver } from "vee-validate";
import {
  required,
  max,
  email,
  numeric,
  min_value,
} from "vee-validate/dist/rules";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "You may not left {_field_} empty",
});
extend("max", {
  ...max,
  message: "{_field_} should not exceed {length} characters",
});
extend("email", {
  ...email,
  message: "{_value_} is not a valid email",
});
extend("numeric", {
  ...numeric,
  message: "{_value_} is not a valid number",
});
extend("min_value", {
  ...min_value,
  message: "{_value_} is less then 1",
});

@Component({
  data() {
    return {
      persons: [],
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      streetName: "",
      email: "",
      streetNumber: 1,
      yearsRegistered: 0,
    };
  },
  components: {
    FirstNameInput,
    LastNameInput,
    CityInput,
    EmailInput,
    CountryInput,
    StateInput,
    StreetNumberInput,
    YearsRegisteredInput,
    StreetNameInput,
    PersonsTable,
    ValidationObserver,
  },
})
export default class MyComponent extends Vue {
  private persons!: Person[];
  public store: MyStore = useStore(this.$store);
  private firstName!: string;
  private lastName!: string;
  private city!: string;
  private country!: string;
  private state!: string;
  private streetName!: string;
  private email!: string;
  private streetNumber!: number;
  private yearsRegistered!: number;

  private get readPersonsGetter(): Person[] {
    return this.store.persons.persons;
  }
  private get btnShow(): boolean {
    this.firstName = this.store.persons.firstName;
    this.lastName = this.store.persons.lastName;
    this.city = this.store.persons.city;
    this.country = this.store.persons.country;
    this.state = this.store.persons.state;
    this.streetName = this.store.persons.streetName;
    this.email = this.store.persons.email;
    this.streetNumber = this.store.persons.streetNumber;
    this.yearsRegistered = this.store.persons.yearsRegistered;

    if (
      this.firstName.length === 0 ||
      this.lastName.length === 0 ||
      this.country.length === 0 ||
      this.state.length === 0 ||
      this.streetName.length === 0 ||
      this.email.length === 0 ||
      this.city.length === 0
    ) {
      return true;
    } else if (
      this.firstName.length <= 20 &&
      this.lastName.length <= 20 &&
      this.country.length <= 20 &&
      this.state.length <= 20 &&
      this.streetName.length <= 20 &&
      this.store.persons.validEmail === true &&
      this.store.persons.validStreetNumber === true &&
      this.store.persons.validYearsRegistered === true &&
      this.city.length <= 20
    ) {
      return false;
    } else {
      return true;
    }
  }

  mounted() {
    this.persons = this.readPersonsGetter;
  }

  public validatePerson() {
    const pers = new Person(
      {
        first: this.store.persons.firstName,
        last: this.store.persons.lastName,
      },
      {
        street: {
          number: this.store.persons.streetNumber,
          name: this.store.persons.streetName,
        },
        city: this.store.persons.city,
        state: this.store.persons.state,
        country: this.store.persons.country,
      },
      this.store.persons.email,
      { date: new Date(), age: this.store.persons.yearsRegistered }
    );
    this.store.persons.addPerson(pers);
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.data-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
}
h2 {
  text-align: center;
}
textarea {
  width: 100%;
}
</style>
