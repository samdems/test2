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
    import {useErrorStore} from '../stores/errors.js'
    const errors = useErrorStore()
</script>