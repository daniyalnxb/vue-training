<script setup lang="ts">
    const emit = defineEmits(['click']);
</script>
    
<template>
    <button @click="$emit('click')" class="button">Add</button>
</template>

<style scoped>
    .button {
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
    }
</style>
