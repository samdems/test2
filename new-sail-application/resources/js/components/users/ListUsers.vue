<template>
<table class="table table-striped">
  <thead class="thead-light">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Date created</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users.Users" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ dayjs(user.created_at).format("DD/MM/YYYY HH:mm") }}</td>
      <td>
        <button class="btn btn-danger" @click="users.deleteUser(user)">Remove</button>
      </td>
    </tr>
  </tbody>
</table>

</template>


<script setup>
import { useUserStore } from "../../stores/users";
import dayjs from "dayjs";
const users = useUserStore();

async function fetchData() {
  await users.fetchUsers();
}

fetchData();
</script>