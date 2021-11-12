import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { clickOutside } from '@/directives/click-outside';

import './design/index.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.directive('click-outside', clickOutside);
app.mount('#app');
