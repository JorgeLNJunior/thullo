<script lang="ts" setup>
import { ref } from 'vue'
import { uiState } from '../../store/ui.state'
import { onClickOutside } from '@vueuse/core'

const modal = ref(null)

const data = ref({
  // eslint-disable-next-line prettier/prettier
  cover: 'https://images.unsplash.com/photo-1659877327193-3b78f3d70de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMzI3NDAw&ixlib=rb-1.2.1&q=80&w=1080'
})

onClickOutside(modal, () => closeModal())

function closeModal() {
  uiState.isModalOpen = false
}
</script>

<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div
        v-if="uiState.isModalOpen"
        class="bg-slate-800/50 fixed z-10 w-screen h-screen flex justify-center items-center"
      >
        <div ref="modal" class="bg-white rounded-lg absolute w-80">
          <!-- Close button -->
          <button
            class="bg-blue-500 h-8 w-8 rounded-lg absolute top-2 right-2 flex items-center justify-center hover:bg-blue-600"
            @click="closeModal()"
          >
            <span class="material-icons text-white font-semibold">close</span>
          </button>
          <!-- Content -->
          <div class="flex flex-col p-5 space-y-6">
            <!-- Cover Image -->
            <img
              class="rounded-lg w-full h-20 object-cover"
              :src="data.cover"
            />
            <!-- Title input -->
            <input
              class="w-full h-8 p-2.5 bg-white rounded-md shadow-md text-us font-poppins font-medium outline-gray-300 outline-1 outline-none focus:outline-2 focus:outline-blue-500"
              type="text"
              placeholder="Add board title..."
            />
            <!-- Buttons -->
            <div class="flex flex-row space-x-6">
              <!-- Cover Button -->
              <button
                class="w-32 h-8 flex items-center justify-center bg-gray-200 rounded-lg space-x-2 hover:bg-gray-300"
              >
                <span class="material-icons text-gray-500 font-medium text-sm">
                  image
                </span>
                <span class="font-popins font-medium text-gray-500 text-xs">
                  Cover
                </span>
              </button>
              <!-- Visibility Button -->
              <button
                class="w-32 h-8 flex items-center justify-center bg-gray-200 rounded-lg space-x-2 hover:bg-gray-300"
              >
                <span class="material-icons text-gray-500 font-medium text-sm">
                  lock
                </span>
                <span class="font-popins font-medium text-gray-500 text-xs">
                  Private
                </span>
              </button>
            </div>
            <!-- Form buttons -->
            <div class="flex justify-end space-x-3">
              <button
                class="bg-transparent rounded-lg flex items-center justify-center w-20 h-8 space-x-1 hover:bg-slate-200"
                @click="closeModal()"
              >
                <span class="font-popins font-medium text-gray-500 text-us">
                  Cancel
                </span>
              </button>
              <button
                class="bg-blue-500 rounded-lg flex items-center justify-center w-20 h-8 space-x-1 hover:bg-blue-600"
              >
                <span class="material-icons text-white font-medium text-sm">
                  add
                </span>
                <span class="font-popins font-medium text-white text-us">
                  Create
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
