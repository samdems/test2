<template>
    <div>
      <table class="table table-striped">
        <thead class="thead-light">
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meeting in meetings" :key="meeting.id">
            <td>{{ meeting.title }}</td>
            <td>{{ meeting.date }}</td>
            <td>{{ meeting.start_time }}</td>
            <td>{{ meeting.end_time }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="actions">
                <button class="btn btn-danger" @click="deleteMeeting(meeting)">
                  Remove
                </button>
                <button
                  class="btn btn-secondary"
                  @click="updateMeeting(meeting.id)"
                >
                  Update
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" @click="router.push('/meetings/new')">
        Add Meeting
      </button>
    </div>
  </template>
  
  <script setup>
  import { useMeetingStore } from "../../stores/meetings";
  import { useRouter } from "vue-router";
  
  const { meetings, fetchMeetings, deleteMeeting } = useMeetingStore();
  const router = useRouter();
  
  async function updateMeeting(meetingId) {
    router.push(`/meetings/${meetingId}`);
  }
  
  fetchMeetings();
  </script>
  