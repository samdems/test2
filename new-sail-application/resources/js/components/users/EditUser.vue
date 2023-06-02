<template>
  <form class="container">
    <div class="mb-3 input-group">
      <label class="input-group-text" for="name">Name:</label>
      <input
        v-model="user.name"
        type="text"
        id="name"
        class="form-control"
        placeholder="Name"
        aria-label="Name"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="email">Email:</label>
      <input
        v-model="user.email"
        type="email"
        id="email"
        class="form-control"
        placeholder="Email"
        aria-label="Email"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="password">Password:</label>
      <input
        v-model="user.password"
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        aria-label="Password"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="password-confirm">Confirm Password:</label>
      <input
        v-model="user.passwordConfirm"
        type="password"
        id="password-confirm"
        class="form-control"
        placeholder="Confirm Password"
        aria-label="Confirm Password"
      />
    </div>
    <div class="mb-3 input-group">
      <label class="input-group-text" for="organization">Organization:</label>
      <Multiselect
        v-model="user.organization"
        :options="organizations.Organizations"
        label="name"
        valueProp="id"
        id="organization"
        class="form-control"
      />
    </div>
    <button type="submit" class="btn btn-primary">{{ id ? "Update" : "Create" }}</button>
  </form>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'

import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/users";
import { useOrganizationStore } from '../../stores/organizations.js';
import {ref} from 'vue';
const route = useRoute();
const router = useRouter()
const users = useUserStore();
const organizations = useOrganizationStore();
const id = ref(route.params?.id);
const user = ref({
    name:'',
    email:'',
    password:'',
    passwordConfirm:'',
    organization:null
})
async function fetchData() {
    organizations.fetchOrganizations()
    if(!id.value) return 
    user.value = await users.fetchUser(id.value);
}
async function save(){
  let userUpdated
  if(id.value) {
    userUpdated = update()
  }else{
    userUpdated = make()
  }

  if(userUpdated){
    router.push('/users')
  }
}
async function update(){
 return users.updateUser(user.value)
}
async function make(){
  return users.createUser(user.value)
}
fetchData()

</script>
