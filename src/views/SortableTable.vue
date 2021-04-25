<template>
  <div class="wrapper">
    <h4>
      If you want get random persons from server you may choose count of them
    </h4>
    <div class="number-wrapper">
      <md-field>
        <label>Number</label>
        <md-input v-model="number" type="number"></md-input>
      </md-field>
      <md-button class="md-raised md-primary" @click="addServerPersons"
        >Read persons</md-button
      >
    </div>
    <form @submit.prevent="sort">
      <div class="select-wrapper">
        <md-field>
          <label for="sort">Sort</label>
          <md-select v-model="sortType" name="sort" id="sort" required>
            <md-option value="Bubble">Bubble sort</md-option>
            <md-option value="Shake">Shake sort</md-option>
            <md-option value="Selection">Selection sort</md-option>
            <md-option value="Insertion">Insertion sort</md-option>
            <md-option value="Shell">Shell sort</md-option>
            <md-option value="Quick">Quick sort</md-option>
            <md-option value="Pyramidal">Pyramidal sort</md-option>
            <md-option value="Default">Default sort</md-option>
          </md-select>
        </md-field>
        <span v-if="showSelectError" class="error">The Sort is required</span>
      </div>
      <div class="select-wrapper">
        <md-field>
          <label for="field">Field to sort</label>
          <md-select v-model="sortBy" name="field" id="field" required>
            <md-option value="Bubble">First name</md-option>
            <md-option value="Shake">Last name</md-option>
            <md-option value="Selection">Country</md-option>
            <md-option value="Insertion">Email</md-option>
            <md-option value="Shell">City</md-option>
            <md-option value="Quick">State</md-option>
            <md-option value="Pyramidal">Street</md-option>
            <md-option value="Default">Street number</md-option>
            <md-option value="Default">Years registered</md-option>
          </md-select>
        </md-field>
        <!-- <span v-if="showSelectError" class="error">The field is required</span> -->
      </div>
      <md-button class="md-raised md-primary" @click="sort" type="submit"
        >Sort persons</md-button
      >
      <div class="buttons-group">
        <md-button class="md-raised md-primary" @click="save"
          >Save persons</md-button
        >
        <md-button class="md-raised md-primary" @click="read"
          >Read persons</md-button
        >
      </div>
      <PersonsTable v-if="persons.length !== 0" :persons="persons" />
    </form>

    <!-- {{ readPersonsGetter }}{{ readPersons }} -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import PersonsTable from "@/components/PersonsTable.vue";
import Person from "@/store/modules/person";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
@Component({
  data() {
    return {
      persons: [],
      number: 1,
      sortType: "",
      sortBy: "",
    };
  },
  components: {
    PersonsTable,
  },
})
export default class Home extends Vue {
  private personsReaded!: Person[];
  private persons!: Person[];
  public store: MyStore = useStore(this.$store);
  private number!: number;
  private sortType!: string;
  private sortBy!: string;
  private get readPersons(): Person[] {
    return this.persons;
  }
  private get readPersonsGetter(): Person[] {
    return this.store.persons.persons;
  }
  private get showSelectError(): boolean {
    return this.sortType == "";
  }
  private sort() {
    this.store.persons.bubbelSort();
    this.persons = this.store.persons.persons;
  }
  private save(): void {
    const parsed = JSON.stringify(this.persons);
    localStorage.setItem("persons", parsed);
  }
  private read(): void {
    this.personsReaded = [...JSON.parse(localStorage.getItem("persons")!)];
    this.personsReaded.forEach((personReaded: Person): void => {
      this.store.persons.addPerson(
        new Person(
          personReaded[Object.keys(personReaded)[0]],
          personReaded[Object.keys(personReaded)[1]],
          personReaded[Object.keys(personReaded)[2]],
          personReaded[Object.keys(personReaded)[3]]
        )
      );
    });
  }
  mounted(): void {
    this.persons = this.readPersonsGetter;
  }
  private addServerPersons(): void {
    this.store.persons.personsFromServer = this.number;
    this.store.persons.getUsers();
  }
}
</script>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
}
.error {
  color: #ff5252;
}
.wrapper {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
.number-wrapper {
  width: 80%;
  display: flex;
}
.md-button {
  width: 200px;
}
h4 {
  margin: 0;
}
.md-field {
  width: 80%;
  margin: 10px 0 0 0;
}
form {
  display: flex;
  align-items: center;
  width: 80%;
}
</style>
