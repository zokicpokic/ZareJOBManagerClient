import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faStop, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

library.add(faPlay, faPause, faStop, faCheck, faUser);
app.component('font-awesome-icon', FontAwesomeIcon);

const pinia = createPinia();
app.use(pinia);

// Use the Vue Router
app.use(router);

app.mount('#app');
