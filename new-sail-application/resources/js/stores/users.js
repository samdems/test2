import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../axiosInstance.js';

export const useUserStore = defineStore('Users', () => {
  const Users = ref([]);
  async function fetchUsers() {
    try {
      const response = await axios.get('/api/users');
      Users.value = response.data;
    } catch (error) {
      handleRequestError(error);
    }
  }

  async function fetchUser(userId) {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      handleRequestError(error);
      return null;
    }
  }

  async function createUser(newUser) {
    try {
      const response = await axios.post('/api/users', newUser);
      Users.value.push(response.data);
    } catch (error) {
      handleRequestError(error);
    }
  }

  async function deleteUser(user) {
    try {
      await axios.delete(`/api/users/${user.id}`);
      Users.value = Users.value.filter(u => u.id !== user.id);
    } catch (error) {
      handleRequestError(error);
    }
  }

  async function updateUser(user) {
    try {
      const response = await axios.put(`api/users/${user.id}`, user);
      const updatedUser = response.data;
      Users.value = Users.value.map(user => {
        if (user.id === updatedUser.id) return updatedUser;
        return user;
      });
    } catch (error) {
      handleRequestError(error);
    }
  }

  function handleRequestError(error) {
    console.error('Request failed:', error);
  }


  return {
    Users,
    fetchUsers,
    fetchUser,
    createUser,
    deleteUser,
    updateUser,
  };
});
