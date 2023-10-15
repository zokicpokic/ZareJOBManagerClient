/* eslint-disable no-useless-catch */
// src/services/codeTablesService.js

import axios from 'axios'; // You can use any HTTP library here

const BASE_URL = 'https://localhost:3000/api'; //dev
//const BASE_URL = 'https://89.216.103.191:3000/api'; //production

export async function fetchUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      throw error;
    }
  }