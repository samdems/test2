import '../css/app.sass'

import {createApp} from 'vue/dist/vue.esm-bundler.js';
import {createPinia} from 'pinia'
import { createRouter,createWebHistory } from 'vue-router';
import '@vueform/multiselect/themes/default.css';
import Home from './components/Home.vue';
import ListUsers from './components/users/ListUsers.vue';
import ListMeetings from './components/meetings/ListMeetings.vue'
import PageNotFound from './components/PageNotFound.vue';
import EditMeetings from './components/meetings/EditMeetings.vue'
import EditUser from './components/users/EditUser.vue';
import error from './components/error.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/users',component: ListUsers},
  { path: '/users/new',component: EditUser},
  { path: '/users/:id',component: EditUser},
  { path: '/meetings',component: ListMeetings},
  { path: '/meetings/new',component: EditMeetings},
  { path: '/meetings/:id',component: EditMeetings},
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
                                                        
                                                    
                                                            
                                                        