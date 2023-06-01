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
    <div class="input-group mb-3">
      <input
        v-model="user.password"
        type="password"
        class="form-control"
        placeholder="password"
        aria-label="password"
      />
    </div>
    <div class="input-group mb-3">
      <input
        v-model="user.passwordConfirm"
        type="password"
        class="form-control"
        placeholder="password confirm"
        aria-label="password confirm"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="save()">
      {{ id ? "update" : "make" }}
    </button>
  </form>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/users";
import {ref} from 'vue';
const route = useRoute();
const router = useRouter()
const users = useUserStore();

const id = ref(route.params?.id);
const user = ref({
    name:'',
    email:'',
    password:'',
    passwordConfirm:''
})
async function fetchData() {
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
