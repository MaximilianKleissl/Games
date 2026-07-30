<script setup lang="ts">
import { ref, computed } from 'vue'
import wordlist from './wordlist.txt?raw'

// Game setup state
const gameCode = ref('')
const numPlayers = ref(3)
const playerIds = ref('1,2,3')
const gameStarted = ref(false)

// Game state
const round = ref(1)
const wordShownForPlayer = ref<number | null>(null)
const selectedPlayer = ref(0)
const selectedWord = ref('')

const activePlayerIds = computed(() => {
  return playerIds.value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
})

// Deterministic hash function (djb2 algorithm)
function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) + hash) + char
  }
  return Math.abs(hash)
}

// Deterministic seeded random number generator (Mulberry32)
function seededRandom(seed: number): number {
  let t = seed += 0x6D2B79F5
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function getGameState(gameCode: string, numPlayers: number, round: number) {
  const seed = hashString(gameCode + round.toString())
  const words = wordlist.trim().split('\n')
  
  // Select random player (0-indexed)
  const playerIndex = Math.floor(seededRandom(seed) * numPlayers)
  
  // Select random word
  const wordIndex = Math.floor(seededRandom(seed + 1) * words.length)
  const word = words[wordIndex]
  
  return { selectedPlayer: playerIndex, selectedWord: word }
}

function startGame() {
  if (!gameCode.value || numPlayers.value < 2 || activePlayerIds.value.length === 0) {
    alert('Please enter valid game settings')
    return
  }
  gameStarted.value = true
  startRound()
}

function startRound() {
  const state = getGameState(gameCode.value, numPlayers.value, round.value)
  selectedPlayer.value = state.selectedPlayer
  selectedWord.value = state.selectedWord
  wordShownForPlayer.value = null
}

function nextRound() {
  round.value++
  startRound()
}

function showWordForPlayer(playerId: number) {
  wordShownForPlayer.value = playerId
}

function hideWord() {
  wordShownForPlayer.value = null
}

const displayText = computed(() => {
  if (wordShownForPlayer.value === null) {
    return 'Select a player to show their word'
  }
  const isPlayerSelected = wordShownForPlayer.value - 1 === selectedPlayer.value
  return isPlayerSelected ? "YOU DON'T KNOW" : selectedWord.value
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8 text-center">
    <div v-if="!gameStarted" class="w-full max-w-md">
      <h1 class="text-5xl mb-8 text-[#42b883]">Someone Does Not Know</h1>
      <div class="space-y-4">
        <div>
          <label class="block text-lg mb-2 text-[#35495e]">Game Code</label>
          <input 
            v-model="gameCode" 
            type="text" 
            placeholder="Enter a code word"
            class="w-full px-4 py-3 border-2 border-[#42b883] rounded-lg text-lg focus:outline-none focus:border-[#3aa876]"
          />
        </div>
        <div>
          <label class="block text-lg mb-2 text-[#35495e]">Number of Players</label>
          <input 
            v-model.number="numPlayers" 
            type="number" 
            min="2" 
            max="20"
            class="w-full px-4 py-3 border-2 border-[#42b883] rounded-lg text-lg focus:outline-none focus:border-[#3aa876]"
          />
        </div>
        <div>
          <label class="block text-lg mb-2 text-[#35495e]">Active Player IDs (comma-separated)</label>
          <input 
            v-model="playerIds" 
            type="text" 
            placeholder="e.g., 1,2,3"
            class="w-full px-4 py-3 border-2 border-[#42b883] rounded-lg text-lg focus:outline-none focus:border-[#3aa876]"
          />
        </div>
        <button 
          @click="startGame" 
          class="w-full px-8 py-4 text-lg bg-[#42b883] text-white border-none rounded-lg cursor-pointer hover:bg-[#3aa876] transition-colors duration-300"
        >
          Start Game
        </button>
      </div>
    </div>

    <div v-else class="w-full max-w-md">
      <h1 class="text-4xl mb-4 text-[#42b883]">Round {{ round }}</h1>
      <p class="text-lg mb-2 text-[#35495e]">{{ activePlayerIds.length }} active players</p>
      <p class="text-sm mb-8 text-[#35495e]">{{ numPlayers }} players total</p>
      
      <div class="bg-[#f8f9fa] border-2 border-[#42b883] rounded-xl p-8 mb-8 min-h-48 flex items-center justify-center">
        <p class="text-3xl font-bold" :class="wordShownForPlayer !== null && wordShownForPlayer - 1 === selectedPlayer ? 'text-red-500' : 'text-[#42b883]'">
          {{ displayText }}
        </p>
      </div>

      <div class="space-y-4">
        <div v-if="wordShownForPlayer === null" class="grid grid-cols-2 gap-3">
          <button 
            v-for="id in activePlayerIds" 
            :key="id"
            @click="showWordForPlayer(id)" 
            class="px-4 py-3 text-base bg-[#42b883] text-white border-none rounded-lg cursor-pointer hover:bg-[#3aa876] transition-colors duration-300"
          >
            Show for Player {{ id }}
          </button>
        </div>
        <button 
          v-if="wordShownForPlayer !== null"
          @click="hideWord" 
          class="w-full px-8 py-4 text-lg bg-[#35495e] text-white border-none rounded-lg cursor-pointer hover:bg-[#2c3e50] transition-colors duration-300"
        >
          Hide Word
        </button>
        <button 
          @click="nextRound" 
          class="w-full px-8 py-4 text-lg bg-[#42b883] text-white border-none rounded-lg cursor-pointer hover:bg-[#3aa876] transition-colors duration-300"
        >
          Next Round
        </button>
        <button 
          @click="gameStarted = false; round = 1" 
          class="w-full px-8 py-4 text-lg bg-[#35495e] text-white border-none rounded-lg cursor-pointer hover:bg-[#2c3e50] transition-colors duration-300"
        >
          New Game
        </button>
      </div>
    </div>

    <router-link to="/" class="mt-8 text-[#35495e] no-underline text-lg hover:underline">
      ← Back to Welcome Screen
    </router-link>
  </div>
</template>
