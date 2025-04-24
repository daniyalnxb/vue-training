<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    import { destinations } from '@/destinations-data';

    const route = useRoute();
    const destinationId = computed(() => parseInt(route.params.id));
    // const destination = computed(() => destinations?.find((dest) => dest.id === destinationId.value));
    // here we no longer need the computed property destination as we are fetching it from server.
    const destination = ref(null);
    const baseUrl = 'https://travel-dummy-api.netlify.app';

    const fetchDestinationData = async () => {
        const response = await fetch(`${baseUrl}/${route.params.slug}`);
        destination.value = await response.json();
    }

    onMounted(() => {
        fetchDestinationData();
    });

    watch(() => route.params, async () => {
        fetchDestinationData();
    });
</script>

<template>
    <section v-if="destination" class="destination">
        <div>
            <h1>{{ destination?.name }}</h1>
            <div class="destination-details">
                <img :src="`/images/${destination?.image}`" :alt="destination?.name">
                <p>{{ destination?.description }}</p>
            </div>
        </div>
    </section>
    <h1 v-if="!destination">No data found</h1>
</template>
