import { createApp } from "vue";
import App from "./App.vue";
import { Axios } from "axios";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
