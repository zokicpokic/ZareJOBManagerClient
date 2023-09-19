import { createRouter, createWebHashHistory } from 'vue-router';
import JobList from '../components/JobList.vue';
import UserLogin from '../components/UserLogin.vue';

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/jobs',
    name: 'JobList',
    component: JobList
  }
];

const router = createRouter({
  history: createWebHashHistory(),
 //base: '/jobmanager/', // production
  routes
});

export default router;
