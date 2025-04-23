<script setup>
    import { destinations } from '@/destinations-data.js';
</script>

<template>
    <div id="nav">
        <router-link id="logo" to="/">Travel App</router-link>
        <router-link
                v-for="destination in destinations"
                :key="destination.id"
                :to="{name: 'destination.show', params:{ id: destination.id, slug: destination.slug }}"
            >
                <h2>{{ destination.name }}</h2>
        </router-link>
    </div>
</template>
