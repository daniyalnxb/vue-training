<script setup>
    import { computed } from 'vue';
    import { destinations } from '@/destinations-data';

    import ExperienceCard from '@/components/ExperienceCard.vue';

    const props = defineProps({
        // id: { type: String, required: true },
        id: { type: Number, required: true },
    });

    const destination = computed(() => destinations?.find((dest) => dest.id === props.id));
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
    <section class="experiences">
        <h2>Top Experiences in {{ destination?.name }}</h2>
        <div class="cards">
            <router-link
                v-for="experience in destination?.experiences"
                :key="experience?.slug"
                :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
            >
                <ExperienceCard
                    :experience="experience"
                />
            </router-link>
        </div>
    </section>
    <h1 v-if="!destination">No data found</h1>
</template>
