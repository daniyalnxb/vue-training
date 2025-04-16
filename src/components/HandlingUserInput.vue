<script setup>
  import { ref } from 'vue';

  const msg = ref('Hello World!');
  const reverseMessage = () => msg.value = msg.value.split('').reverse().join('');
  const appendExclamation = () => msg.value += '!';
  const submitForm = () => alert('Navigation was prevented!');

</script>

<template>
    <div class="he">
        <h1>{{ msg }}</h1>
        <button @click="reverseMessage">Reverse Message</button>
        <button @click="appendExclamation">Append "!"</button>
        <a href="www.google.com" @click.prevent="submitForm">A link with e.preventDefault()</a>
    </div>
</template>

<style scoped>
    .he {
        display: flex;
        flex-direction: column;
        gap: 10px;

        h1 {
            text-align: center;
        }
    }
</style>
