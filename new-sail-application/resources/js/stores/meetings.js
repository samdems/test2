import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../axiosInstance.js';
import { useErrorStore } from './errors.js';

export const useMeetingStore = defineStore('Meetings', () => {
  const errors = useErrorStore();
  const meetings = ref([]);
  const myMeetings = ref([]);

  async function fetchMeetings() {
    try {
      const response = await axios.get('/api/meetings',{ params: { all:true } });
      meetings.value = response.data;
    } catch (error) {
      errors.handleError(error);
    }
  }
  async function fetchMyMeetings(){
    try {
      const response = await axios.get('/api/meetings');
      myMeetings.value = response.data;
    } catch (error) {
      errors.handleError(error);
    }
  }
  async function fetchMeeting(meetingId) {
    try {
      const response = await axios.get(`/api/meetings/${meetingId}`);
      return response.data;
    } catch (error) {
      errors.handleError(error);
      return null;
    }
  }

  async function createMeeting(newMeeting) {
    try {
      const response = await axios.post('/api/meetings', newMeeting);
      meetings.value.push(response.data);
      myMeetings.value.push(response.data); //TODO need to add check for if made by admin
      return newMeeting;
    } catch (error) {
      errors.handleError(error);
    }
  }

  async function deleteMeeting(meeting) {
    try {
      await axios.delete(`/api/meetings/${meeting.id}`);
      meetings.value = meetings.value.filter(m => m.id !== meeting.id);
      myMeetings.value = myMeetings.value.filter(m => m.id !== meeting.id);
    } catch (error) {
      errors.handleError(error);
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
      myMeetings.value = myMeetings.value.map(m => {
        if (m.id === updatedMeeting.id) return updatedMeeting;
        return m;
      });
      return updatedMeeting
    } catch (error) {
      errors.handleError(error);
    }
  }


  return {
    meetings,
    myMeetings,
    fetchMyMeetings,
    fetchMeetings,
    fetchMeeting,
    createMeeting,
    deleteMeeting,
    updateMeeting,
  };
});
