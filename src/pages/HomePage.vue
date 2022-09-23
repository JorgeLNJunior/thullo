<script setup lang="ts">
import { useHead } from '@vueuse/head'
import BoardCard from '../components/home/BoardCard.vue'
import CreateBoardModal from '../components/home/CreateBoardModal.vue'
import { uiState } from '../store/ui.state'

useHead({ title: 'Home | Thullo' })
</script>

<template>
  <div class="container pt-8 pl-20">
    <div class="flex flex-col space-y-3 justify-start">
      <div class="flex justify-between">
        <span class="font-poppins font-medium text-lg select-none">
          All boards
        </span>
        <button
          class="flex items-center w-16 h-8 bg-blue-500 rounded-lg py-2 px-3 space-x-1 hover:bg-blue-600"
          @click="uiState.isModalOpen = true"
        >
          <span class="material-icons text-white text-sm">add</span>
          <span class="font-poppins font-medium text-us text-white">Add</span>
        </button>
      </div>
      <div class="flex flex-wrap">
        <BoardCard />
      </div>
    </div>
  </div>
  <CreateBoardModal />
</template>
