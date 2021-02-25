import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {
  MdButton,
  MdField,
  MdSwitch,
  MdMenu,
  MdList,
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdSwitch);
Vue.use(MdMenu);
Vue.use(MdList);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
