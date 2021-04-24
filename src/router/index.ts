import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import SortableTable from "../views/SortableTable.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "SortableTable",
    component: SortableTable,
  },
  {
    path: "/sort-inputs",
    name: "SortInputs",
    component: () => import("../views/SortInputs.vue"),
  },
  {
    path: "/sort-graphik",
    name: "SortGraphik",
    component: () => import("../views/SortGraphik.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
