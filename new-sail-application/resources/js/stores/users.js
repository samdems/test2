import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../axiosInstance.js';
import { useErrorStore } from './errors.js';

export const useUserStore = defineStore('Users', () => {
  const errors = useErrorStore()
  const Users = ref([]);
  async function fetchUsers() {
    try {
      const response = await axios.get('/api/users');
      Users.value = response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchUser(userId) {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  async function createUser(newUser) {
    try {
      if(newUser.password !== newUser.passwordConfirm) {
        handleError('password and confirm need to be the same')
        return
      }
      const response = await axios.post('/api/users', newUser);
      Users.value.push(response.data);
      return newUser
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteUser(user) {
    try {
      await axios.delete(`/api/users/${user.id}`);
      Users.value = Users.value.filter(u => u.id !== user.id);
    } catch (error) {
      handleError(error);
    }
  }

  async function updateUser(user) {
    try {
      if(user.password !== user.passwordConfirm) {
        return  handleError('password and confirm need to be the same')
      }
      const response = await axios.put(`api/users/${user.id}`, user);
      const updatedUser = response.data;
      Users.value = Users.value.map(user => {
        if (user.id === updatedUser.id) return updatedUser;
        return user;
      });
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    console.error('Request failed:', error);
    errors.add({
      text:error?.response?.data?.message || error?.message || error
    })
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
