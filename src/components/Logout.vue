<template>
    <button @click="signOut">Logout</button>
</template>

<script setup>
import { supabase } from "../config/supabase.js"
import router from '../routes/router';
import {ref } from 'vue'
const loading = ref(true)


async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    router.push('/user/login')
    loading.value = false
  }
}

</script>