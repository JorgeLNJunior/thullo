<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { onClickOutside, useDateFormat } from '@vueuse/core'
import { ref } from 'vue'
import { marked } from 'marked'
import { Board } from '../../api/board.service'
import { User } from '../../api/user.service'
import { Member } from '../../api/member.service'

const props = defineProps({
  board: {
    type: Object as PropType<Board>,
    required: true
  },
  members: {
    type: Array<Member>,
    required: true
  },
  ownerUser: {
    type: Object as PropType<User>,
    required: true
  }
})

const createdAt = useDateFormat(Date.now(), 'D MMM YYYY', { locales: 'pt-BR' })

const isModalOpen = ref(false)
const modal = ref(null)

onClickOutside(modal, () => closeModal())

function closeModal() {
  isModalOpen.value = false
}

const descriptionToHtml = computed(() => {
  return marked.parse(props.board.description)
})
</script>

<template>
  <button
    class="flex items-center justify-center bg-gray-200 px-3 h-8 rounded-lg space-x-2 hover:bg-gray-300"
    @click="isModalOpen = true"
  >
    <span class="material-icons text-gray-500 font-medium text-sm">
      more_horiz
    </span>
    <span class="font-popins font-medium text-gray-500 text-sm">
      Mostrar Menu
    </span>
  </button>
  <!-- Modal -->
  <Transition
    name="board-menu-dropdown"
    enter-active-class="animate__animated animate__slideInRight animate__faster"
    leave-active-class="animate__animated animate__slideOutRight animate__faster"
  >
    <div
      v-if="isModalOpen"
      ref="modal"
      class="absolute z-10 right-0 top-16.5 w-96 bg-white shadow-md rounded-md max-h-screen overflow-y-scroll"
    >
      <div class="flex flex-col justify-start p-5 divide-y space-y-2">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <!-- Title -->
          <span
            class="font-poppins font-semibold text-xs text-slate-900 select-none"
          >
            {{ props.board.title }}
          </span>
          <!-- Close Button -->
          <button class="flex items-center" @click="closeModal()">
            <span class="material-icons text-slate-600">close</span>
          </button>
        </div>
        <div class="flex flex-col justify-start pt-2 space-y-3">
          <!-- Made By -->
          <div class="flex items-center space-x-1 select-none">
            <span class="material-icons text-sm text-slate-400">person</span>
            <span class="font-poppins font-semibold text-us text-slate-400">
              Feito por
            </span>
          </div>
          <!-- User Info -->
          <div class="flex flex-row space-x-2 select-none">
            <img
              class="rounded-lg w-8 h-8"
              :src="props.ownerUser.profileImage"
            />
            <div class="flex flex-col space-y-0.5">
              <span class="font-poppins font-semibold text-xs text-slate-800">
                {{ props.ownerUser.name }}
              </span>
              <span class="font-NotoSans font-semibold text-us text-slate-400">
                Em {{ createdAt }}
              </span>
            </div>
          </div>
          <!-- Description Icons -->
          <div class="flex items-center space-x-3 pt-2">
            <div class="flex items-center space-x-1 select-none">
              <span class="material-icons text-sm text-slate-400">
                description
              </span>
              <span class="font-poppins font-semibold text-us text-slate-400">
                Descrição
              </span>
            </div>
            <button
              class="flex items-center justify-center rounded-lg border border-slate-400 w-16 h-6 space-x-1 hover:bg-slate-100"
            >
              <span class="material-icons text-sm text-slate-400">edit</span>
              <span class="font-poppins font-semibold text-us text-slate-400">
                Editar
              </span>
            </button>
          </div>
          <!-- Board Description -->
          <article
            class="prose prose-slate prose-sm break-all select-none"
            v-html="descriptionToHtml"
          ></article>
          <!-- Members -->
          <div class="space-y-2">
            <div class="flex items-center space-x-1 select-none py-3">
              <span class="material-icons text-sm text-slate-400">
                description
              </span>
              <span class="font-poppins font-semibold text-us text-slate-400">
                Time
              </span>
            </div>
            <div
              v-for="member in members"
              :key="member.userId"
              class="flex flex-row justify-between items-center select-none"
            >
              <div class="flex flex-row space-x-2">
                <img
                  class="rounded-lg w-8 h-8"
                  :src="member.user.profileImage"
                />
                <div class="flex items-center">
                  <span
                    class="font-poppins font-semibold text-xs text-slate-800"
                  >
                    {{ member.user.name }}
                  </span>
                </div>
              </div>
              <button
                class="w-16 h-6 border border-red-500 rounded-lg hover:bg-red-100 flex items-center justify-center"
              >
                <span class="font-poppins font-medium text-us text-red-500">
                  Remover
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
