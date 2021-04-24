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
    <div class="buttons-group">
      <md-button class="md-raised md-primary" @click="save"
        >Save persons</md-button
      >
      <md-button class="md-raised md-primary" @click="read"
        >Read persons</md-button
      >
    </div>
    <PersonsTable :persons="persons" />
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
  private get readPersonsGetter(): Person[] {
    return this.store.persons.persons;
  }
  private save(): void {
    const parsed = JSON.stringify(this.persons);
    localStorage.setItem("persons", parsed);
  }
  private read(): void {
    console.log(
      "JSON.parse(localStorage.getItem('persons')!",
      JSON.parse(localStorage.getItem("persons")!)
    );
    this.personsReaded = [...JSON.parse(localStorage.getItem("persons")!)];
    this.personsReaded.forEach((personReaded): void => {
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
  padding: 1px 8px;
}
h4 {
  margin: 0;
}
</style>

function keyof(personReaded: Person): any { throw new Error("Function not
implemented."); }
