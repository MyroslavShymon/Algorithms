import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Dropdown from "primevue/dropdown";

import "primeflex/primeflex.css";
import "primevue/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true });

app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Button", Button);
app.component("InputNumber", InputNumber);
app.component("InputText", InputText);
app.component("Dropdown", Dropdown);

app.mount("#app");
