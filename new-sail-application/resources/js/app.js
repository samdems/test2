import '../css/app.sass'
import '@vueform/multiselect/themes/default.css';

import {createApp} from 'vue/dist/vue.esm-bundler.js';
import {createPinia} from 'pinia'
import { createRouter,createWebHistory } from 'vue-router';

import error from './components/error.vue'
import appNav from './components/appNav.vue'

import routes from './routes';


const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp({});
app.component('error',error)
app.component('app-nav',appNav)

app.use( createPinia())
app.use(router)

app.mount("#app");
                                                        
                                                    
                                                            
                                                        