<template>
  <form>
    <div class="input-group mb-3">
      <input
        v-model="user.name"
        type="text"
        class="form-control"
        placeholder="name"
        aria-label="name"
      />
    </div>
    <div class="input-group mb-3">
      <input
        v-model="user.email"
        type="email"
        class="form-control"
        placeholder="email"
        aria-label="email"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="save()">
      {{ id ? "update" : "make" }}
    </button>
  </form>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/users";
import {ref} from 'vue';
const route = useRoute();
const users = useUserStore();

const id = ref(route.params?.id);
const user = ref({
    name:'',
    email:'',
    password:''
})
async function fetchData() {
    if(!id.value) return 
    user.value = await users.fetchUser(id.value);
}
async function save(){
  if(id.value) return update()
  return make()
}
async function update(){
 return users.updateUser(user.value)
}
async function make(){
  return users.createUser(user.value)
}
fetchData()

</script>
