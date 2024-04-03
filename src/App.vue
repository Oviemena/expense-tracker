<template>
    <Home  v-if="session" :session="session"/>
    <Login v-else/>
    <router-view/>
</template>

<script setup>
import { supabase } from './config/supabase';
import { onMounted, ref} from 'vue';
import router from './routes/router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';

// const user = ref(null)
// // const session = ref('')

// const checkCurrentUser = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     return user
// };


const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})






// onMounted(async () => {
//     user.value = await checkCurrentUser()
//     if (user.value) {
//         router.push('/')
//     } else {
//         router.push('/user/login')
//     }

//     supabase.auth.getSession().then(({ data }) => {
//     session.value = data.session
//   })

//   supabase.auth.onAuthStateChange((_, session) => {
//     session.value = session
//     if(!session) router.push('/user/login')
//     else router.push('/')
//   })
// })
</script>