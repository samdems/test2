<template>
    <div>
        <div class="alert alert-danger alert-dismissible pull-right" role="alert" v-for="error in errors.Errors" :key="error.id">
            {{ error.text }}
            <button type="button" class="btn close" data-dismiss="alert" aria-label="Close" @click="errors.remove(error.id)">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
import {useErrorStore} from '../stores/errors.js'
    const errors = useErrorStore()

    onMounted(()=>{
        errors.add({
            text:'this is an error'
        })
        errors.add({
            text:'this is an error2'
        })
    })
    

</script>