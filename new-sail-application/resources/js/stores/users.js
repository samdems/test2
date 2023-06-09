import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../axiosInstance.js';
import { useErrorStore } from './errors.js';

export const useUserStore = defineStore('Users', () => {
  const errors = useErrorStore()
  const Users = ref([]);
  const authenticated = ref(false);
  const ActiveUser = ref();
  async function login(email, password) {
    try {
      const response = await axios.post('/api/login', { email, password });
      const token = response.data.token;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      authenticated.value = true
      ActiveUser.value = response.data.user
      
    } catch (error) {
      errors.handleError('Username or password is invalid');
      authenticated.value = false
      ActiveUser.value = null;
    }
  }
  async function fetchUsers() {
    try {
      const response = await axios.get('/api/users');
      Users.value = response.data;
    } catch (error) {
      errors.handleError(error);
    }
  }

  async function fetchUser(userId) {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      errors.handleError(error);
      return null;
    }
  }

  async function createUser(newUser) {
    newUser.admin = false
    try {
      if(newUser.password !== newUser.passwordConfirm) {
        errors.handleError('password and confirm need to be the same')
        return
      }
      const response = await axios.post('/api/users', newUser);
      Users.value.push(response.data);
      return newUser
    } catch (error) {
      errors.handleError(error);
    }
  }

  async function deleteUser(user) {
    try {
      await axios.delete(`/api/users/${user.id}`);
      Users.value = Users.value.filter(u => u.id !== user.id);
    } catch (error) {
      errors.handleError(error);
    }
  }

  async function updateUser(user) {
    user.admin = false
    try {
      if(user.password !== user.passwordConfirm) {
        return  errors.handleError('password and confirm need to be the same')
      }
      const response = await axios.put(`api/users/${user.id}`, user);
      const updatedUser = response.data;
      Users.value = Users.value.map(user => {
        if (user.id === updatedUser.id) return updatedUser;
        return user;
      });
    } catch (error) {
      errors.handleError(error);
    }
  }


  return {
    Users,
    authenticated,
    ActiveUser,
    login,
    fetchUsers,
    fetchUser,
    createUser,
    deleteUser,
    updateUser,
  };
});
