<template>
  <div>
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
            <div class="btn-group" role="group" aria-label="actions">
              <button class="btn btn-danger" @click="users.deleteUser(user)">
                Remove
              </button>
              <button
                class="btn btn-secondary"
                @click="router.push(`/users/${user.id}`)"
              >
                update
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" @click="router.push('/users/new')">
      add user
    </button>
  </div>
</template>


<script setup>
import { useUserStore } from "../../stores/users";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
const users = useUserStore();
const router = useRouter();

async function fetchData() {
  await users.fetchUsers();
}

fetchData();
</script>