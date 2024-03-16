<template>
    <h4 class="text">Your Balance</h4>
    <h1 id="balance" class="text">${{ total }}</h1>
</template>

<script setup>
const props = defineProps({
    total: {
        type: Number,
        required: true
    }
})
</script>