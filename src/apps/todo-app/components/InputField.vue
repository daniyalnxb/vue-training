<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        modelValue: string;
        onKeyDown?: (e: KeyboardEvent) => void;
        placeholder: string;
        type: string;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>();

    // need to create computed value as props are readonly and we can't update them
    const inputValue = computed({
        get: () => props.modelValue,
        set: (value: string) => emit('update:modelValue', value)
    });
</script>

<template>
    <div class="input-field">
        <input
            :type="type"
            :placeholder="props.placeholder"
            :value="inputValue"
            @input="(e) => inputValue = (e.target as HTMLInputElement).value"
            @keydown="props.onKeyDown"
        />
    </div>
</template>

<style scoped>
    .input-field {
        flex: 1;
        border-radius: 10px;
        border: 1px solid #ccc;

        input {
            width: 100%;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;

            &:focus {
                outline: none;
            }
        }
    }
</style>