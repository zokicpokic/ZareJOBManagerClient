import { defineStore } from 'pinia'; // Import defineStore, not createPinia
import * as codeTablesService from '@/services/codeTablesService';

export const useCodeTablesStore = defineStore({
  id: 'codeTables',
  state: () => ({
    users: [],
    jobTypes: [],
    materialsEquipment: [],
    statuses: [],
    clients: [],
  }),
  getters: {
    getUsers: (state) => state.users,
    getJobTypes: (state) => state.jobTypes,
    getMaterialsEquipment: (state) => state.materialsEquipment,
    getStatuses: (state) => state.statuses,
    getClients: (state) => state.clients,
  },
  actions: {
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
  },
});
