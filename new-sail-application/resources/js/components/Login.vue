<template>
   <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <h1 class="mb-4 text-center">Login</h1>
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe">
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
          <button type="submit" class="btn btn-primary w-100" @click.prevent="login">Login</button>
        </form>
      </div>
    </div> 
</template>
<script setup>
import { useUserStore } from "../stores/users";
import { useRouter } from "vue-router";
import {ref} from 'vue'

const users = useUserStore();
const router = useRouter();
const password = ref();
const email = ref ();
async function login(){
  await users.login(email.value,password.value)
  router.push('/');
}
</script>