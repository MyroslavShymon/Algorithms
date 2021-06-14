<template>
  <div class="p-d-flex p-mt-2" v-if="JSON.stringify(users) !== '[]'">
    <div v-show="this.$store.state.users.showGraphicLeft" style="flex-grow:1">
      <BarChart />
    </div>
    <div
      class="p-jc-end"
      :class="{
        'p-d-block': !this.$store.state.users.showGraphicLeft,
        'p-d-flex': this.$store.state.users.showGraphicLeft,
      }"
      style="flex-grow:1"
    >
      <DataTable
        :value="users"
        :paginator="true"
        :rows="10"
        showGridlines
        class="p-datatable-sm"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="usersToShow"
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        <template #header>
          USERS
        </template>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="age" header="Age"></Column>
      </DataTable>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { IUser } from "@/store/modules/users/types/interfaces";
import Loader from "@/components/Loader.vue";
import BarChart from "@/components/Sort/BarChart.vue";

@Options({
  name: "ResultTable",
  components: {
    Loader,
    BarChart,
  },
  data() {
    return {};
  },
})
export default class ResultTable extends Vue {
  @Prop() users!: IUser[];
  // basicData = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       backgroundColor: "#42A5F5",
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //     },
  //     {
  //       label: "My Second dataset",
  //       backgroundColor: "#FFA726",
  //       data: [28, 48, 40, 19, 86, 27, 90],
  //     },
  //   ],
  // };
  private get usersToShow(): number[] {
    if (this.users.length <= 10) {
      return [this.users.length];
    }
    if (this.users.length <= 20) {
      return [10, 20];
    }
    return [10, 20, this.users.length];
  }
}
</script>
