/* eslint-disable import/no-unresolved */
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'virtual:svg-icons-register';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(router).use(store).use(Antd).mount('#app');
