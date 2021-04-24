<template>
  <table>
    <thead>
      <tr>
        <td
          v-for="(headerTitle, index) of headerTitles"
          :key="index"
          ref="headTitle"
        >
          {{ iterateHeaderTitles(headerTitle) }}
        </td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(person, index) of persons" :person="person" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ person.name.first }}</td>
        <td>{{ person.name.last }}</td>
        <td>{{ person.location.country }}</td>
        <td>{{ person.location.state }}</td>
        <td>{{ person.location.city }}</td>
        <td>{{ person.location.street.name }}</td>
        <td>
          <!-- {{ calcStreetNumber(person.location.street.number) }} -->
          {{ person.location.street.number }}
        </td>
        <td>{{ person.email }}</td>
        <td>{{ person.registered.age }}</td>
        <td>{{ person.registered.date }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Person from "@/store/modules/person";
enum headerTitles {
  "№",
  "Name",
  "Surname",
  "Country",
  "State",
  "City",
  "Street name",
  "Street number",
  "Email",
  "Years registered",
  "Date of registration",
}

@Component({
  data() {
    return { headerTitles };
  },
})
export default class PersonTable extends Vue {
  @Prop() private persons!: Person[];

  // public calcStreetNumber(streetNumber: number): number {
  //   const numberToCalc = Math.round(streetNumber / 200);
  //   numberToCalc === 0
  //     ? (streetNumber = Math.floor(Math.random() * 100))
  //     : (streetNumber = numberToCalc);
  //   return streetNumber;
  // }
  public iterateHeaderTitles(headerTitle: string | number): string | undefined {
    if (typeof headerTitle !== "number") return headerTitle;
  }
  //   mounted(): void {

  //     if (this.$refs.headTitle) {
  //       console.log(((this.$refs.headTitle as Vue).$el as HTMLElement).innerHTML);
  //     }
  //   }
}
</script>

<style scoped>
tbody tr td {
  padding: 5px 13px;
  border: 1px solid #448aff;
}
</style>
