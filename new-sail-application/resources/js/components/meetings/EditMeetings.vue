<template>
  <form class="container">
    <div class="mb-3 input-group">
      <label class="input-group-text" for="title">Title:</label>
      <input
        v-model="meeting.title"
        type="text"
        id="title"
        class="form-control"
        placeholder="Title"
        aria-label="Title"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="date">Date:</label>
      <input
        v-model="meeting.date"
        type="date"
        id="date"
        class="form-control"
        placeholder="Date"
        aria-label="Date"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="start-time">Start Time:</label>
      <input
        v-model="meeting.start_time"
        type="time"
        id="start-time"
        class="form-control"
        placeholder="Start Time"
        aria-label="Start Time"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="end-time">End Time:</label>
      <input
        v-model="meeting.end_time"
        type="time"
        id="end-time"
        class="form-control"
        placeholder="End Time"
        aria-label="End Time"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="agenda">Agenda:</label>
      <input
        v-model="meeting.agenda"
        type="text"
        id="agenda"
        class="form-control"
        placeholder="Agenda"
        aria-label="Agenda"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="attendees">Attendees:</label>
      <Multiselect
        v-model="meeting.attendees"
        mode="multiple"
        :options="users.Users"
        label="name"
        valueProp="id"
        id="attendees"
        class="form-control"
      />
    </div>
    <button type="submit" class="btn btn-primary">{{ id ? "Update" : "Create" }}</button>
  </form>
</template>



  
  <script setup>
  import { useRoute, useRouter } from "vue-router";
  import { useMeetingStore } from "../../stores/meetings";
  import { ref } from 'vue';
  import { useUserStore } from "../../stores/users";
  import Multiselect from '@vueform/multiselect'
  import { useOrganizationStore } from '../../stores/organizations.js';

  const organizations = useOrganizationStore();


  const route = useRoute();
  const router = useRouter();
  const meetings = useMeetingStore();
  const users = useUserStore();
  
  const id = ref(route.params?.id);
  const meeting = ref({
    title: '',
    date: '',
    start_time: '',
    end_time: '',
    agenda: '',
    attendees: [],
    organization: users.ActiveUser.organization_id
  });
  
  async function fetchData() {
    users.fetchUsers();
    if (!id.value) return;
    meeting.value = await meetings.fetchMeeting(id.value);
  }
  
  async function save() {
    let meetingUpdated;
    if (id.value) {
      meetingUpdated = await update();
    } else {
      meetingUpdated = await create();
    }
  debugger
    if (meetingUpdated) {
      router.push('/mymeetings');
    }
  }
  
  async function update() {
    return meetings.updateMeeting(meeting.value);
  }
  
  async function create() {
    return meetings.createMeeting(meeting.value);
  }
  
  fetchData();
  </script>
  