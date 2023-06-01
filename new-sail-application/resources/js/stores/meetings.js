import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../axiosInstance.js';
import { useErrorStore } from './errors.js';

export const useMeetingStore = defineStore('Meetings', () => {
  const errors = useErrorStore();
  const meetings = ref([]);

  async function fetchMeetings() {
    try {
      const response = await axios.get('/api/meetings');
      meetings.value = response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchMeeting(meetingId) {
    try {
      const response = await axios.get(`/api/meetings/${meetingId}`);
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  async function createMeeting(newMeeting) {
    try {
      const response = await axios.post('/api/meetings', newMeeting);
      meetings.value.push(response.data);
      return newMeeting;
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteMeeting(meeting) {
    try {
      await axios.delete(`/api/meetings/${meeting.id}`);
      meetings.value = meetings.value.filter(m => m.id !== meeting.id);
    } catch (error) {
      handleError(error);
    }
  }

  async function updateMeeting(meeting) {
    try {
      const response = await axios.put(`/api/meetings/${meeting.id}`, meeting);
      const updatedMeeting = response.data;
      meetings.value = meetings.value.map(m => {
        if (m.id === updatedMeeting.id) return updatedMeeting;
        return m;
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
    meetings,
    fetchMeetings,
    fetchMeeting,
    createMeeting,
    deleteMeeting,
    updateMeeting,
  };
});
