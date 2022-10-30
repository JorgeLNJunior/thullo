<script lang="ts" setup>
import { uiState } from '../../store/ui.state'
import { onClickOutside } from '@vueuse/core'
import { BoardService } from '../../api/board.service'

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, Field } from 'vee-validate'
import { useToast } from 'vue-toastification'

import ButtonSpinner from '../common/ButtonSpinner.vue'

const router = useRouter()
const toast = useToast()

// UI Data
// eslint-disable-next-line prettier/prettier
const cover = 'https://images.unsplash.com/photo-1659877327193-3b78f3d70de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMzI3NDAw&ixlib=rb-1.2.1&q=80&w=1080'
const isLoading = ref(false)
const titleLenght = computed(() =>
  titleValue.value ? titleValue.value.length : 0
)

// Form Validation
const { errorMessage, value: titleValue } = useField('title', validateTitle, {
  validateOnMount: true
})

function validateTitle(value: string) {
  if (!value) return 'Campo obrigatório.'
  if (value.length > 30) return 'Deve ter no máximo 30 caracteres.'
  return true
}

// Form submit
async function onSubmit() {
  try {
    isLoading.value = true
    const board = await new BoardService().create({
      title: titleValue.value,
      description: 'Add a board description.'
    })
    toast.success('Board criado com sucesso.')
    uiState.isModalOpen = false
    await router.push({ name: 'Board', params: { id: board.id } })
  } catch (error) {
    toast.error('Ocorreu um erro ao criar o board.')
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

// Modal
const modal = ref(null)

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
          <form
            class="flex flex-col p-5 space-y-6"
            @submit.prevent="onSubmit()"
          >
            <!-- Cover Image -->
            <img class="rounded-lg w-full h-20 object-cover" :src="cover" />
            <!-- Title input -->
            <div class="flex flex-col w-full space-y-1.5">
              <Field
                v-model="titleValue"
                autocomplete="off"
                class="w-full h-8 p-2.5 bg-white rounded-md shadow-md text-us font-poppins font-medium outline-gray-300 outline-1 outline-none focus:outline-2 focus:outline-blue-500"
                type="text"
                placeholder="Add board title..."
                name="title"
              />
              <!-- Error Message -->
              <div class="flex justify-between">
                <div v-auto-animate class="flex w-full">
                  <span
                    v-if="errorMessage"
                    class="text-us font-medium text-red-400 whitespace-nowrap"
                  >
                    {{ errorMessage }}
                  </span>
                </div>
                <span class="text-us self-end font-medium text-slate-800">
                  {{ titleLenght }}/30
                </span>
              </div>
            </div>
            <!-- Buttons -->
            <div class="flex flex-row space-x-6">
              <!-- Cover Button -->
              <button
                type="button"
                class="w-32 h-8 flex items-center justify-center bg-gray-200 rounded-lg space-x-2 hover:bg-gray-300"
              >
                <span class="material-icons text-gray-500 font-medium text-sm">
                  image
                </span>
                <span class="font-popins font-medium text-gray-500 text-xs">
                  Capa
                </span>
              </button>
              <!-- Visibility Button -->
              <button
                type="button"
                class="w-32 h-8 flex items-center justify-center bg-gray-200 rounded-lg space-x-2 hover:bg-gray-300"
              >
                <span class="material-icons text-gray-500 font-medium text-sm">
                  lock
                </span>
                <span class="font-popins font-medium text-gray-500 text-xs">
                  Privado
                </span>
              </button>
            </div>
            <!-- Form buttons -->
            <div class="flex justify-end space-x-3">
              <!-- Cancel Button -->
              <button
                class="bg-transparent rounded-lg flex items-center justify-center w-20 h-8 space-x-1 hover:bg-slate-200"
                @click="closeModal()"
              >
                <span class="font-popins font-medium text-gray-500 text-us">
                  Cancelar
                </span>
              </button>
              <!-- Submit Button -->
              <button
                :disabled="!!errorMessage || isLoading"
                class="bg-blue-500 rounded-lg disabled:bg-red-400 disabled:hover:bg-red-400 w-20 h-8 hover:bg-blue-600"
              >
                <div class="flex items-center justify-center">
                  <ButtonSpinner v-if="isLoading" />
                  <div
                    v-else
                    class="flex items-center justify-center space-x-1"
                  >
                    <span class="material-icons text-white font-medium text-sm">
                      add
                    </span>
                    <span class="font-popins font-medium text-white text-us">
                      Criar
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </form>
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
