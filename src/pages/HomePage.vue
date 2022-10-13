<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onBeforeMount, ref } from 'vue'
import { Board } from '../api/board.service'
import { User, UserService } from '../api/user.service'
import BoardCard from '../components/home/BoardCard.vue'
import CreateBoardModal from '../components/home/CreateBoardModal.vue'
import getLocalStorageObject from '../helpers/getLocalStorageObject'
import { uiState } from '../store/ui.state'
import ButtonSpinner from '../components/common/ButtonSpinner.vue'

const boards = ref<Board[]>()

const isLoading = ref(false)

onBeforeMount(async () => {
  isLoading.value = true

  const user = getLocalStorageObject<User>('user')
  boards.value = await new UserService().boards(user.id)

  isLoading.value = false
})

useHead({ title: 'Home | Thullo' })
</script>

<template>
  <!-- Spinner -->
  <div v-if="isLoading" class="w-screen h-90 flex justify-center items-center">
    <ButtonSpinner class="fill-blue-500 h-14 w-14" />
  </div>
  <!-- Main -->
  <div v-if="!isLoading" class="container pt-8 pl-20">
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
      <div v-if="boards" class="flex flex-wrap">
        <BoardCard v-for="board in boards" :key="board.id" :board="board" />
      </div>
    </div>
  </div>
  <CreateBoardModal />
</template>

<style>
.h-90 {
  height: 90vh;
}
</style>
