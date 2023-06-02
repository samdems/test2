<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">meetings</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <span v-for="(route, index) in routes" :key="index">
            <li v-if="route.nav && isAdmin(route)" class="nav-item" :class="{ active: isActiveRoute(route.path) }">
              <router-link :to="route.path" class="nav-link">
                {{route.name}}
              </router-link>
            </li>
          </span>
        </ul>
      </div>
      <div class="ml-auto">
        {{ users.ActiveUser?.name }} - {{ users.ActiveUser?.organization?.name }}
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import routes from "../routes.js";
import {useUserStore} from "../stores/users"
const users = useUserStore()
const route = useRoute();

const isActiveRoute = (path) => route.path === path;
function isAdmin(route){
  if(users.ActiveUser?.admin) return true
  return !route.admin
}
</script>
