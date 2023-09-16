import { createRouter, createWebHistory } from 'vue-router';
import JobList from '../components/JobList.vue';
import NewJob from '../components/NewJob.vue'; // Import the NewJob component

const routes = [
  {
    path: '/',
    name: 'NewJob', // Give it a name for reference
    component: NewJob, // Use your New Job component
  },
  {
    path: '/new-job',
    name: 'Home',
    component: NewJob // Associate the /new-job path with the NewJob component
  },
  {
    path: '/jobs',
    name: 'JobList',
    component: JobList
  }
  // Add other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  //base: '/jobmanager/', // production
  routes
});

export default router;
