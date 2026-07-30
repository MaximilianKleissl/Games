<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
    <h1 class="text-5xl mb-4 text-[#42b883]">Welcome to Games</h1>
    <p class="text-xl mb-8 text-[#35495e]">Select a game to play:</p>
    <div class="flex gap-8 flex-wrap justify-center">
      <router-link to="/hello-world" class="bg-[#f8f9fa] border-2 border-[#42b883] rounded-xl p-8 w-64 text-[#35495e] no-underline hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <h2 class="text-2xl mb-2 text-[#42b883]">Hello World</h2>
        <p class="text-base mb-0">A simple sample game</p>
      </router-link>
    </div>
  </div>
</template>
