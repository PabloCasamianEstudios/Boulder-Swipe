import { createApp } from 'vue'
import './css/styles.css'
import './css/variables.scss';

import router from './router';
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.mount('#app');
