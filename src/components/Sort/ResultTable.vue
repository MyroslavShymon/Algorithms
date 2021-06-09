<template>
  <div class="p-d-flex p-mt-2" v-if="JSON.stringify(users) !== '[]'">
    <div v-show="this.$store.state.users.showGraphicLeft" style="flex-grow:1">
      Graphic
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
import Loader from "@/components/Loader.vue";
import { IUser } from "@/store/modules/users/types/interfaces";
@Options({
  name: "ResultTable",
  components: {
    Loader,
  },
})
export default class ResultTable extends Vue {
  @Prop() users!: IUser[];

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
