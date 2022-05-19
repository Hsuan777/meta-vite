import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import pinia from './store';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles/main.scss';

createApp(App).use(router).use(VueAxios, axios).use(pinia).mount('#app');
