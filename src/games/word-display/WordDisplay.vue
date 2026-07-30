<script setup lang="ts">
import { ref } from 'vue'
import wordlist from '../someone-does-not-know/wordlist.txt?raw'

const currentWord = ref('')
const wordIndex = ref(0)

const words = wordlist.trim().split('\n')

function showNextWord() {
  currentWord.value = words[wordIndex.value]
  wordIndex.value = (wordIndex.value + 1) % words.length
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
    <h1 class="text-5xl mb-8 text-[#42b883]">Wort Anzeige</h1>
    
    <div class="bg-[#f8f9fa] border-2 border-[#42b883] rounded-xl p-8 mb-8 min-h-48 flex items-center justify-center w-full max-w-md">
      <p v-if="currentWord" class="text-4xl font-bold text-[#42b883]">
        {{ currentWord }}
      </p>
      <p v-else class="text-2xl text-[#35495e]">
        Klicke auf "Nächstes Wort" um zu starten
      </p>
    </div>

    <div class="space-y-4 w-full max-w-md">
      <button 
        @click="showNextWord" 
        class="w-full px-8 py-4 text-lg bg-[#42b883] text-white border-none rounded-lg cursor-pointer hover:bg-[#3aa876] transition-colors duration-300"
      >
        Nächstes Wort
      </button>
      <button 
        @click="currentWord = ''; wordIndex = 0" 
        class="w-full px-8 py-4 text-lg bg-[#35495e] text-white border-none rounded-lg cursor-pointer hover:bg-[#2c3e50] transition-colors duration-300"
      >
        Zurücksetzen
      </button>
    </div>

    <router-link to="/" class="mt-8 text-[#35495e] no-underline text-lg hover:underline">
      ← Zurück zur Startseite
    </router-link>
  </div>
</template>
