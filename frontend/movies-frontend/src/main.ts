import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { clickOutside } from '@/directives/click-outside';
import { configureLogger } from '@/utils/logger';

import './design/index.scss';

const app = createApp(App);

configureLogger(app);

app.use(store);
app.use(router);

app.directive('click-outside', clickOutside);
app.mount('#app');
