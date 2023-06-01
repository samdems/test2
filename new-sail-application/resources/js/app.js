import '../css/app.sass'

import {createApp} from 'vue/dist/vue.esm-bundler.js';
import {createPinia} from 'pinia'
import { createRouter,createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import ListUsers from './components/users/ListUsers.vue';
import PageNotFound from './components/PageNotFound.vue';
import editUser from './components/users/editUser.vue';
import error from './components/error.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/users',component: ListUsers},
  { path: '/users/new',component: editUser},
  { path: '/users/:id',component: editUser},
  { path: "/:pathMatch(.*)*", component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp({});
app.component('error',error)
app.use( createPinia())
app.component('home-component', Home);
app.use(router)
app.mount("#app");
                                                        
                                                    
                                                            
                                                        