<template>
    <h2 class="text">Expense Tracker</h2>
    <Logout />
    <div>
      <!-- <span>{{ session.user.email }}</span> -->
    </div>
</template>
<script setup>
import Logout from './Logout.vue'
// import { supabase } from '../config/supabase.js';
// import { onMounted, ref, toRefs } from 'vue'

// const props = defineProps(['session'])
// const { session } = toRefs(props)

// const loading = ref(true)
// const username = ref('')
// // const avatar_url = ref('')


// onMounted(() => {
//   getProfile()
// })

// async function getProfile() {
//   try {
//     loading.value = true
//     // const { user } = session.value

//     const { data, error, status } = await supabase
//       .from('users')
//       .select(`username`)
//       .eq('id', user.id)
//       .single()

//     if (error && status !== 406) throw error

//     if (data) {
//       username.value = data.username
//       // avatar_url.value = data.avatar_url
//     }
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }

</script>
