import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './users';
import { useRouter } from "vue-router";
import axiosInstance from '../axiosInstance';
export const useErrorStore = defineStore('Errors', () => {
    const Errors = ref([])
    const users = useUserStore();
    const router = useRouter();
    function add(error) {
        error.id = Math.random().toString(16).slice(2)
        Errors.value.push(error)
        setTimeout(()=>{
            remove(error.id)
        }, error.timeout || 5000)

    }
    function remove(id){
       Errors.value = Errors.value.filter(r => r.id !== id);
    }
    function handleError(error){
        console.error('Request failed:', error);
        if(error?.response?.status == 401) {
            axiosInstance.defaults.headers.common['Authorization'] = null;
            users.authenticated = false;
             router.push('/organizations');
        }
        add({
            text: error?.response?.data?.message || error?.message || error,
        });
    }
    return {Errors,add,remove,handleError}
})
