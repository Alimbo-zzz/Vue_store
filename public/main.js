import { createApp } from 'vue'
import App from '@/App.vue';
import '@/styles/index.scss';

import router from "@/plugins/router";
import vuex from '@/plugins/vuex';


const app = createApp(App);

app.use(vuex);
app.use(router);

app.mount('#app');