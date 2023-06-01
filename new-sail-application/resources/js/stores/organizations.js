import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../axiosInstance.js';
import { useErrorStore } from './errors.js';

export const useOrganizationStore = defineStore('Organizations', () => {
  const errors = useErrorStore();
  const Organizations = ref([]);

  async function fetchOrganizations() {
    try {
      const response = await axios.get('/api/organizations');
      Organizations.value = response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchOrganization(organizationId) {
    try {
      const response = await axios.get(`/api/organizations/${organizationId}`);
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  async function createOrganization(newOrganization) {
    try {
      const response = await axios.post('/api/organizations', newOrganization);
      Organizations.value.push(response.data);
      return newOrganization;
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteOrganization(organization) {
    try {
      await axios.delete(`/api/organizations/${organization.id}`);
      Organizations.value = Organizations.value.filter(
        org => org.id !== organization.id
      );
    } catch (error) {
      handleError(error);
    }
  }

  async function updateOrganization(organization) {
    try {
      const response = await axios.put(
        `api/organizations/${organization.id}`,
        organization
      );
      const updatedOrganization = response.data;
      Organizations.value = Organizations.value.map(org => {
        if (org.id === updatedOrganization.id) return updatedOrganization;
        return org;
      });
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    console.error('Request failed:', error);
    errors.add({
      text: error?.response?.data?.message || error?.message || error,
    });
  }

  return {
    Organizations,
    fetchOrganizations,
    fetchOrganization,
    createOrganization,
    deleteOrganization,
    updateOrganization,
  };
});
