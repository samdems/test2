<template>
    <form>
      <div class="input-group mb-3">
        <input
          v-model="meeting.title"
          type="text"
          class="form-control"
          placeholder="title"
          aria-label="title"
        />
      </div>
      <div class="input-group mb-3">
        <input
          v-model="meeting.date"
          type="date"
          class="form-control"
          placeholder="date"
          aria-label="date"
        />
      </div>
      <div class="input-group mb-3">
        <input
          v-model="meeting.start_time"
          type="time"
          class="form-control"
          placeholder="start time"
          aria-label="start time"
        />
      </div>
      <div class="input-group mb-3">
        <input
          v-model="meeting.end_time"
          type="time"
          class="form-control"
          placeholder="end time"
          aria-label="end time"
        />
      </div>
      <div class="input-group mb-3">
        <input
          v-model="meeting.agenda"
          type="text"
          class="form-control"
          placeholder="agenda"
          aria-label="agenda"
        />
      </div>
      <div class="input-group mb-3">
           <Multiselect
                v-model="meeting.attendees"
                mode="multiple"
                :options="users.Users"
                label="name"
                valueProp="id"
            />
      </div>
      <div class="input-group mb-3">
           <Multiselect
                v-model="meeting.organization"
                :options="organizations.Organizations"
                label="name"
                valueProp="id"
            />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="save()">
        {{ id ? "Update" : "Create" }}
      </button>
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
    organization:null
  });
  
  async function fetchData() {
    organizations.fetchOrganizations()
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
  
    if (meetingUpdated) {
      router.push('/meetings');
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
  