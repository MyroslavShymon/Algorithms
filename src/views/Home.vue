<template>
  <div class="home"></div>

  <Button label="Greet" class="p-button-warning" @click="getCounter"></Button>

  <div v-for="(item, index) of doubledCounter" :key="index">
    {{ item.email }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  MutationNames,
  ActionNames,
} from "@/store/modules/user/types/actions-mutations-names-list";
import { mapGetters } from "vuex";
@Options({
  computed: mapGetters(["doubledCounter"]),
})
export default class Home extends Vue {
  [x: string]: any;
  users: any = [];
  // смешиваем результат mapGetters с внешним объектом computed
  doubledCounter: any;
  async getCounter() {
    const result = await this.$store.dispatch(
      ActionNames.REQUEST_FOR_USERS,
      256
    );
    this.users = this.$store.state.user.user;
    console.log(
      "ActionNames.GET_COUTNER_ASYNC async result = ",
      this.$store.getters.doubledCounter
      // this.$store.state.user.ddd,
      // JSON.parse(JSON.stringify(this.users)),
      // "doubledCounter",
      // this.doubledCounter
    );
  }
}
</script>
