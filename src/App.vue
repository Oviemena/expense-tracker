<template>
    <router-view />
</template>

<script setup>
import { supabase } from './config/supabase';
import { onMounted, ref} from 'vue';
import router from './routes/router';

const user = ref(null)

const checkCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user
};


onMounted(async () => {
    user.value = await checkCurrentUser()
    if (user.value) {
        router.push('/')
    }
})
</script>