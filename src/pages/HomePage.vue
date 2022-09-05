<script setup lang="ts">
import BoardCard from '../components/home/BoardCard.vue'
import CreateBoardModal from '../components/home/CreateBoardModal.vue'
import { uiState } from '../store/ui.state'
</script>

<template>
  <div class="container p-10">
    <div class="flex flex-col space-y-4">
      <div class="flex justify-between">
        <span class="font-poppins font-medium text-md">All boards</span>
        <button
          class="flex items-center bg-blue-500 rounded-lg py-2 px-3 space-x-1 hover:bg-blue-600"
          @click="uiState.isModalOpen = true"
        >
          <span class="material-icons text-white text-base">add</span>
          <span class="font-poppins font-medium text-sm text-white">Add</span>
        </button>
      </div>
      <div class="flex flex-wrap">
        <BoardCard />
      </div>
    </div>
  </div>
  <CreateBoardModal />
</template>
