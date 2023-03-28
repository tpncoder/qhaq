import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import VueHighlightJS from 'vue-highlightjs'

const app = createApp(App);

app.use(router);
app.use(VueHighlightJS)

app.mount("#app");
