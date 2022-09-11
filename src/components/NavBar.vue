<script setup lang="ts">
import { ref } from 'vue'
import { uiState } from '../store/ui.state'

const user = ref({
  name: 'Ryan Moore',
  // eslint-disable-next-line prettier/prettier
  profileImage: 'https://images.unsplash.com/photo-1660314176057-d01f4ec7d4ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYxOTcxNjY3&ixlib=rb-1.2.1&q=80&w=400'
})
</script>

<template>
  <nav class="bg-white px-2 py-2 shadow-sm">
    <div class="container mx-auto flex items-center justify-between py-1">
      <!-- Logo -->
      <router-link to="/" class="flex space-x-3 max-w-sm">
        <img src="../assets/Logo-small.svg" />
        <span class="font-poppins font-semibold self-center text-xl">
          Thullo
        </span>
      </router-link>
      <!-- Board title -->
      <div v-if="uiState.isBoardOpen" class="flex space-x-4 items-center">
        <span class="font-poppins font-medium text-md select-none">
          {{ uiState.openBoardTitle }}
        </span>
        <div class="bg-gray-200 h-6 w-0.5 rounded-lg my-2"></div>
        <button
          class="bg-gray-300 rounded-lg p-1.5 inline-flex space-x-1 items-center text-gray-500 hover:text-gray-600 hover:bg-gray-400"
        >
          <span class="material-icons">apps</span>
          <span class="font-poppins text-sm">All board</span>
        </button>
      </div>
      <div class="flex w-2/4 justify-end space-x-5">
        <!-- Search bar -->
        <div class="relative w-1/2">
          <input
            class="w-full block p-2 bg-white rounded-md shadow-md text-sm font-poppins font-light outline-none focus:outline-2 focus:outline-blue-500"
            type="text"
            placeholder="Keyword..."
          />
          <button
            class="flex items-center text-white absolute right-0.5 bottom-1.5 bg-blue-500 rounded-lg px-6 py-1.5 hover:bg-blue-600 hover:text-gray-200"
          >
            <span class="text-sm font-poppins">Search</span>
          </button>
        </div>
        <!-- User dropdown -->
        <a class="flex items-center space-x-3">
          <img
            class="h-10 rounded-md outline outline-1 outline-slate-200"
            :src="user.profileImage"
          />
          <span class="font-NotoSans font-medium text-sm select-none">
            {{ user.name }}
          </span>
          <span class="material-icons cursor-pointer">arrow_drop_down</span>
        </a>
      </div>
    </div>
  </nav>
</template>
