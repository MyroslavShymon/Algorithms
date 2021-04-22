<template>
  <div class="wrapper">
    <div class="data-wrapper">
      <validation-observer v-slot="{ invalid }">
        <form class="md-layout" @submit.prevent="validatePerson">
          <TextInput :invalid="{ invalid }" data-to-valid="first-name" />
          <TextInput :invalid="{ invalid }" data-to-valid="last-name" />
          <!-- data-to-valid-text="Last name"
            data-to-valid-text="First name" -->
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
import TextInput from "../components/inputs/TextInput.vue";
import { Component, Vue } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { MyStore } from "@/store/store/store";
import Person from "@/store/modules/person";
import PersonsTable from "@/components/PersonsTable.vue";
import { extend, setInteractionMode, ValidationObserver } from "vee-validate";
import { required, max } from "vee-validate/dist/rules";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "You may not left {_field_} empty",
});
extend("max", {
  ...max,
  message: "{_field_} should not exceed {length} characters",
});

@Component({
  data() {
    return {
      persons: [],
      firstName: "",
      lastName: "",
    };
  },
  components: {
    TextInput,
    PersonsTable,
    ValidationObserver,
  },
})
export default class MyComponent extends Vue {
  private persons!: Person[];
  public store: MyStore = useStore(this.$store);
  private firstName!: string;
  private lastName!: string;

  // get the module instance from the created store
  // get the module instance with the given namespace
  // public foo1?: FooModule = useModule(this.$store, ["bar", "foo1"]);

  private get readPersonsGetter(): Person[] {
    return this.store.persons.persons;
  }
  private get btnShow(): boolean {
    this.firstName = this.store.persons.firstName;
    this.lastName = this.store.persons.lastName;
    if (this.firstName.length === 0 || this.lastName.length === 0) {
      return true;
    } else if (this.firstName.length <= 20 || this.lastName.length <= 20) {
      return false;
    } else {
      return true;
    }
  }

  mounted() {
    this.persons = this.readPersonsGetter;
  }

  public validatePerson() {
    console.log("this.store.persons.name", this.store.persons);

    const pers = new Person(
      {
        first: this.store.persons.firstName,
        last: this.store.persons.lastName,
      },
      {
        street: {
          number: 8,
          name: "string",
        },
        city: "string",
        state: "string",
        country: "string",
      },
      "dffv",
      { date: new Date(), age: 7 }
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
