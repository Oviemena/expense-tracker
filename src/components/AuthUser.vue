<template>
  <form class="row flex-center flex" @submit.prevent="mode === 'login' ? handleLogin() : handleSignUp()">
    <div class="col-6 form-widget">
      <h1 class="header">{{ mode === 'login' ? 'Log In' : 'Sign Up' }}</h1>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input class="inputField" required type="password" placeholder="Your Password" v-model="password" />
      </div>
      <div>
        <input type="submit" class="button block" :value="loading ? 'Loading' : 'Continue'" :disabled="loading" />
      </div>
    </div>
    <p>
      {{ mode === 'login' ? "Don't have an account? " : "Already have an account? " }}
      <router-link :to="mode === 'login' ? '/user/register' : '/user/login'">
        {{ mode === 'login' ? 'Sign Up' : 'Log In' }}
      </router-link>
    </p>

  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../config/supabase'
import router from '../routes/router.js'

const props = defineProps({
  mode: {
    type: String,
    required: true
  }
});

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    email.value = '';
    password.value = '';

    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

const handleLogin = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    email.value = '';
    password.value = '';

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    router.push('/')
    loading.value = false
  }
}
</script>
