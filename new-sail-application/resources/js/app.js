import {createApp} from 'vue/dist/vue.esm-bundler.js';
import { createRouter,createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import PageNotFound from './components/PageNotFound.vue';
const routes = [
  { path: '/', component: Home },
  { path: "/:pathMatch(.*)*", component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp({});

app.component('home-component', Home);
app.use(router)
app.mount("#app");
                                                        
                                                    
                                                            
                                                        