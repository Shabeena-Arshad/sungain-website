import { createApp } from "vue";

import App from "@/App.vue";

import "@/plugins/axios";

import VueEasyLightbox from "vue-easy-lightbox";

// ! Important: we need the src/css folder
import "quasar/src/css/index.sass";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
app.use(VueEasyLightbox);
registerPlugins(app);

app.mount("#app");
