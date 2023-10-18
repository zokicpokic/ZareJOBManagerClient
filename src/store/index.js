import { defineStore } from 'pinia'; // Import defineStore, not createPinia
import * as codeTablesService from '@/services/codeTablesService';

export const useCodeTablesStore = defineStore('codeTables', {
  state: () => ({
    users: [],
    jobTypes: [],
    materialsEquipment: [],
    statuses: [],
    clients: [],
    jobs: [],
    selectedJob: null,
  }),
  getters: {
    getUsers: (state) => state.users,
    getJobTypes: (state) => state.jobTypes,
    getMaterialsEquipment: (state) => state.materialsEquipment,
    getStatuses: (state) => state.statuses,
    getClients: (state) => state.clients,
    getJobs: (state) => state.jobs,
    getSelectedJob: (state) => state.selectedJob, 
  },
  actions: {
    setSelectedJob(job) {
      this.selectedJob = job; // Set the 'selectedJob' when a job is selected
    },
    async fetchUsers() {
      try {
        this.users = await codeTablesService.fetchUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchJobTypes() {
      try {
        this.jobTypes = await codeTablesService.fetchJobTypes();
      } catch (error) {
        console.error('Error fetching job types:', error);
      }
    },
    async fetchMaterialsEquipment() {
      try {
        this.materialsEquipment = await codeTablesService.fetchMaterialsEquipment();
      } catch (error) {
        console.error('Error fetching materials equipment:', error);
      }
    },
    async fetchStatuses() {
      try {
        this.statuses = await codeTablesService.fetchStatuses();
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    },
    async fetchClients() {
      try {
        this.clients = await codeTablesService.fetchClients();
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
    async fetchJobs() {
      try {
        this.jobs = await codeTablesService.fetchJobs(); // Fetch jobs from your database
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    },
    async createJob(newJobData) {
      try {
        // Call your service function to create a new job
        const createdJob = await codeTablesService.createJob(newJobData);
        return createdJob;
      } catch (error) {
        console.error('Error creating job:', error);
        throw error;
      }
    },
    async updateJob(jobId, updatedJobData) {
      try {
        // Call your service function to update an existing job
        const updatedJob = await codeTablesService.updateJob(jobId, updatedJobData);
        
        // Optionally, you can update the job in the store's state if needed
        const index = this.jobs.findIndex(job => job.id === jobId);
        if (index !== -1) {
          this.jobs[index] = updatedJob;
        }
  
        return updatedJob;
      } catch (error) {
        console.error('Error updating job:', error);
        throw error;
      }
    },
  },
});
