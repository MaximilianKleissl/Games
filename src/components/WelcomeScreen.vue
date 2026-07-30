<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
    <h1 class="text-5xl mb-4 text-[#42b883]">Willkommen zu Spielen</h1>
    <p class="text-xl mb-8 text-[#35495e]">Wähle ein Spiel zum Spielen:</p>
    <div class="flex gap-8 flex-wrap justify-center">
      <router-link to="/hello-world" class="bg-[#f8f9fa] border-2 border-[#42b883] rounded-xl p-8 w-64 text-[#35495e] no-underline hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <h2 class="text-2xl mb-2 text-[#42b883]">Hello World</h2>
        <p class="text-base mb-0">Ein einfaches Beispielspiel</p>
      </router-link>
      <router-link to="/someone-does-not-know" class="bg-[#f8f9fa] border-2 border-[#42b883] rounded-xl p-8 w-64 text-[#35495e] no-underline hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <h2 class="text-2xl mb-2 text-[#42b883]">Jemand weiß es nicht</h2>
        <p class="text-base mb-0">Worträtsel-Partyspiel</p>
      </router-link>
      <router-link to="/word-display" class="bg-[#f8f9fa] border-2 border-[#42b883] rounded-xl p-8 w-64 text-[#35495e] no-underline hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <h2 class="text-2xl mb-2 text-[#42b883]">Wort Anzeige</h2>
        <p class="text-base mb-0">Zufällige Wörter anzeigen</p>
      </router-link>
    </div>
  </div>
</template>
