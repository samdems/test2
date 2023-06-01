import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('Errors', () => {
    const Errors = ref([])

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
    return {Errors,add,remove}
})
