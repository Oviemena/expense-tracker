<template>
  <form @submit.prevent="mode === 'login' ? handleLogin() : handleSignUp()" class="form">
    <v-title>
      <h1 class="header">{{ mode === 'login' ? 'Welcome back' : 'Create an account' }}</h1>
    </v-title>

    <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
      :readonly="loading" class="mb-2 border" name="email" type="email" clearable variant="outlined"
      color="cyan"></v-text-field>

    <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" :readonly="loading"
      label="Password" name="password" type="password" placeholder="Enter your password" clearable variant="outlined"
      color="cyan" class="border"></v-text-field>


    <v-btn class="me-4 " :disabled="!email.meta.valid || !password.meta.valid || loading" :loading="loading"
      color="cyan" size="large" type="submit" variant="elevated" block :text="loading ? 'Loading' : 'Continue'">
    </v-btn>
    <p class="inside">
      {{ mode === 'login' ? "Don't have an account? " : "Already have an account? " }}
      <router-link :to="mode === 'login' ? '/user/register' : '/user/login'" class="remove-underline">
        {{ mode === 'login' ? 'Sign Up' : 'Log In' }}
      </router-link>
    </p>
  </form>
  <button class="gsi-material-button google-form" @click="handleSignInWithGoogle">
      <div class="gsi-material-button-state"></div>
      <div class="gsi-material-button-content-wrapper" >
        <div class="gsi-material-button-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
            xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
            <path fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
            </path>
            <path fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
            </path>
            <path fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
            </path>
            <path fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
            </path>s
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span class="gsi-material-button-contents">Sign in with Google</span>
        <span style="display: none;">Sign in with Google</span>
      </div>
    </button>
  



</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import router from '../routes/router.js'

import { supabase } from '../config/supabase'
import { useToast} from 'vue-Toastification'



const toast = useToast()
const loading = ref(false)
const disabled = ref(false)

const props = defineProps({
  mode: {
    type: String,
    required: true
  }
});

const { meta } = useForm();

const schema = toTypedSchema(
  z.object({
    email: z.string().nonempty().email({ message: 'Must be a valid email' }),
    password: z.string().min(6, { message: 'Too short!' }),
  }),
);

const { handleSubmit,isSubmitting, values } = useForm({
  validationSchema: schema,
})


const password = useField('password')
const email = useField('email')


const handleSignInWithGoogle = async () => {
  try {
    const { data: { user }, session, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) throw error
    toast.success("Sign in with Google sucessfully!")
  } catch (error) {
    alert(error.message)
  }
}

const handleSignUp = handleSubmit(async (values) => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: JSON.stringify(values.email.value),
      password: JSON.stringify(values.password.value),
    })

    console.log(values)


    if (error) throw error
    toast.success("Login link sent to email address")
    alert('Check your email for the login link!')
    email.value = '';
    password.value = '';
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
})

const handleLogin = handleSubmit(async values => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email: JSON.stringify(values.email.value),
      password: JSON.stringify(values.password.value),
    })

    email.value = '';
    password.value = '';

    if (error) throw error
    else {
      toast.success("Login successful!")
      router.push('/')}
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
})

</script>

<style lang="scss">
.border {
  color: whitesmoke;
}

.inside {
  display: inline-flex;
  color: whitesmoke;
  font-size: 15px;
  justify-items: center;
  padding: .7em;
  padding-left: 1.5em;
  padding-right: 1em;
}

.header {
  font-size: 30px;
  color: whitesmoke;
  margin-bottom: .3em;
}

.remove-underline {
  text-decoration: none;
  margin-left: .5em;
  color: rgb(2, 155, 155);
}

.google-form {
  display: flex;
  justify-content: center;
  align-content: center;
  margin:0 auto;
}
</style>
