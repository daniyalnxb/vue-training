<script setup>
    import router from '@/router';

    router
</script>

<template> 
    <span class="go-back">
        <button @click="router.back()">Go Back</button>
    </span>
</template>