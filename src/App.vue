<script setup lang="ts">
  import { useRoute } from 'vue-router';
  
  import TheNavigation from '@/components/TheNavigation.vue';

  const route = useRoute();
</script>

<template>
  <TheNavigation />
  <!-- router view component, is functioal component render the match component for a match path -->
 <div class="container">
   <router-view v-slot="{Component}">
     <transition name="slide" mode="out-in">
      <component :is="Component" :key="route.fullPath"></component>
     </transition>
   </router-view>
 </div>
</template>
