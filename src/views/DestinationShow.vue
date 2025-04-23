<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import { destinations } from '@/destinations-data';

    const route = useRoute();
    const destinationId = computed(() => parseInt(route.params.id));
    const destination = computed(() => destinations?.find((dest) => dest.id === destinationId.value));
</script>

<template>
    <section class="destination">
        <div>
            <h1>{{ destination?.name }}</h1>
            <div class="destination-details">
                <img :src="`/images/${destination?.image}`" :alt="destination?.name">
                <p>{{ destination?.description }}</p>
            </div>
        </div>
    </section>
</template>
