<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { uiState } from '../store/ui.state'
import BoardMembersMenu from '../components/board/BoardMembersMenu.vue'
import BoardMenu from '../components/board/BoardMenu.vue'
import BoardVisibilityButton from '../components/board/BoardVisibilityButton.vue'
import BoardList from '../components/board/list/BoardList.vue'
import { useHead } from '@vueuse/head'

const board = ref({
  // eslint-disable-next-line prettier/prettier
  coverImage: 'https://images.unsplash.com/photo-1660461712603-ffa53b3a3303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUzMDY4&ixlib=rb-1.2.1&q=80&w=1080',
  title: 'DevChallenges Board',
  members: [
    {
      profileImage:
        'https://images.unsplash.com/photo-1659462083377-761311a525ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUyMzI2&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1660314176057-d01f4ec7d4ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUyMzY5&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1660392750311-f50eeaa6c517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUyMzkz&ixlib=rb-1.2.1&q=80&w=400'
    }
  ],
  id: '123'
})

useHead({ title: `${board.value.title} | Thullo` })

onMounted(() => {
  uiState.isBoardOpen = true
  uiState.openBoardTitle = board.value.title
})

onUnmounted(() => (uiState.isBoardOpen = false))
</script>

<template>
  <div class="my-6">
    <div class="flex flex-row justify-between">
      <div class="flex space-x-3">
        <BoardVisibilityButton />
        <BoardMembersMenu :members="board.members" />
      </div>
      <div class="flex">
        <BoardMenu />
      </div>
    </div>
    <div class="flex my-6">
      <BoardList :cover-image="board.coverImage" :members="board.members" />
    </div>
  </div>
</template>
