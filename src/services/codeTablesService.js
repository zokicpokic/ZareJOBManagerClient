/* eslint-disable no-useless-catch */
// src/services/codeTablesService.js

import axios from 'axios'; // You can use any HTTP library here

const BASE_URL = 'https://localhost:3000/api'; //dev
//const BASE_URL = 'https://89.216.103.191:3000/api'; //production

export async function fetchUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    throw error;
  }
}

export async function fetchJobTypes() {
    try {
      const response = await axios.get(`${BASE_URL}/job_types`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function fetchMaterialsEquipment() {
    try {
        const response = await axios.get(`${BASE_URL}/materials_equipment`);
        return response.data
            .filter(item => item.dekel_code && item.dekel_code.trim() !== "") // Exclude items with empty dekel_code
            .sort((a, b) => a.dekel_code.localeCompare(b.dekel_code)); // Sort the filtered items alphabetically
    } catch (error) {
        throw error;
    }
  }

  export async function fetchStatuses() {
    try {
      const response = await axios.get(`${BASE_URL}/statuses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function fetchClients() {
    try {
      const response = await axios.get(`${BASE_URL}/clients`);
      return response.data.sort((a, b) => a.client_name.localeCompare(b.client_name));
    } catch (error) {
      throw error;
    }
  }

  export async function fetchJobs() {
    try {
      const response = await axios.get(`${BASE_URL}/jobs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function createJob(newJobData) {
    try {
      const response = await axios.post(`${BASE_URL}/jobs`, newJobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function updateJob(jobId, updatedJobData) {
    try {
      const response = await axios.put(`${BASE_URL}/jobs/${jobId}`, updatedJobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  