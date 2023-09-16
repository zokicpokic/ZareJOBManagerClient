import { createRouter, createWebHistory } from 'vue-router';
import JobList from '../components/JobList.vue';

const routes = [
  {
    path: '/',
    name: 'JobList', // Give it a name for reference
    component: JobList, // Use your New Job component
  }
  // Add other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  //base: '/jobmanager/', // production
  routes
});

export default router;
