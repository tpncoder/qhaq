import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import VueCodeHighlight from 'vue-code-highlight';

const app = createApp(App);

app.use(router);
app.use(VueCodeHighlight)

app.mount("#app");
