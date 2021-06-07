import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import PrimeVue from "primevue/config";
import Button from "primevue/button";

import "primeflex/primeflex.css";
import "primevue/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true });

app.component("Button", Button);

app.mount("#app");
