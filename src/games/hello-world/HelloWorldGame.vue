<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hallo Welt!')
const count = ref(0)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
    <h1 class="text-5xl mb-4 text-[#42b883]">{{ message }}</h1>
    <p class="text-xl mb-8 text-[#35495e]">Dies ist ein Beispielspiel, um die Multi-Spiel-Struktur zu demonstrieren.</p>
    <button @click="count++" class="px-8 py-4 text-lg bg-[#42b883] text-white border-none rounded-lg cursor-pointer mb-8 hover:bg-[#3aa876] transition-colors duration-300">
      Klick-Anzahl: {{ count }}
    </button>
    <router-link to="/" class="text-[#35495e] no-underline text-lg hover:underline">← Zurück zur Startseite</router-link>
  </div>
</template>
