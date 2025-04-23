<script setup lang="ts">
  import TheNavigation from '@/components/TheNavigation.vue';
</script>

<template>
  <TheNavigation />
  <!-- router view component, is functioal component render the match component for a match path -->
 <div class="container">
   <router-view></router-view>
 </div>
</template>

<style scoped>
</style>
