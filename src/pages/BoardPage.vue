<script lang="ts" setup>
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { uiState } from '../store/ui.state'
import { Board, BoardService } from '../api/board.service'
import { Member } from '../api/member.service'

import BoardMembersMenu from '../components/board/BoardMembersMenu.vue'
import BoardMenu from '../components/board/BoardMenu.vue'
import BoardVisibilityButton from '../components/board/BoardVisibilityButton.vue'
import CardList from '../components/board/list/CardList.vue'
import EmptyCardList from '../components/board/list/EmptyCardList.vue'

import { useHead } from '@vueuse/head'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { List } from '../api/list.service'

import { Events } from '../events/events.enum'
import { useEventBus } from '@vueuse/core'
import { computed } from 'vue'

const boardService = new BoardService()
const emmiter = useEventBus(Events.RELOAD_BOARD_LISTS)

const route = useRoute()
const router = useRouter()
const toast = useToast()

const board = ref<Board>()
const members = ref<Member[]>()
const lists = ref<List[]>()

const sortedLists = computed(() => {
  if (lists.value) {
    return Array.from(lists.value).sort((a, b) =>
      a.position > b.position ? 1 : -1
    )
  }
  return null
})

// Events
onBeforeMount(async () => {
  try {
    const boardId = route.params.id as string
    if (!boardId) {
      toast.error('Board não encontrado.')
      return await router.push('/')
    }
    await fetchBoard(boardId)
    await fetchMembers(boardId)
    await fetchLists(boardId)

    uiState.isBoardOpen = true
    uiState.openBoardTitle = board.value?.title || ''
  } catch (error) {
    if (error instanceof Error) {
      toast.error('Ocorreu um erro.')
    }
    console.log(error)
  }
})

onUnmounted(() => {
  uiState.isBoardOpen = false
})

emmiter.on(async () => {
  console.log('TRIGER')
  await fetchLists(board.value?.id as string)
})

// Fetch Data
async function fetchBoard(boardId: string) {
  board.value = await boardService.findById(boardId)
}

async function fetchLists(boardId: string) {
  lists.value = await boardService.lists(boardId)
}

async function fetchMembers(boardId: string) {
  members.value = await boardService.members(boardId)
}

if (board.value) useHead({ title: `${board.value.title} | Thullo` })
</script>

<template>
  <div class="my-6">
    <div class="flex flex-row justify-between">
      <div class="flex space-x-3">
        <BoardVisibilityButton />
        <BoardMembersMenu v-if="members" :members="members" />
      </div>
      <div class="flex">
        <BoardMenu
          v-if="board && members"
          :board="board"
          :owner-user="members[0].user"
          :members="members"
        />
      </div>
    </div>
    <div v-if="lists" class="flex my-6 space-x-6">
      <CardList v-for="list in sortedLists" :key="list.id" :list="list" />
      <EmptyCardList />
    </div>
  </div>
</template>
