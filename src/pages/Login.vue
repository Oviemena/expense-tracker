<template>
    <Auth mode="login"/>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const Auth = defineAsyncComponent(() => import('@/components/AuthUser.vue'));

</script>