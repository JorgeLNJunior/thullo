<script lang="ts" setup>
import { onClickOutside, useEventBus } from '@vueuse/core'
import { Field, useField } from 'vee-validate'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import { ListService } from '../../../api/list.service'
import ButtonSpinner from '../../common/ButtonSpinner.vue'
import { Events } from '../../../events/events.enum'

const toast = useToast()
const route = useRoute()
const emmiter = useEventBus(Events.RELOAD_BOARD_LISTS)

// Form Validation
const { errorMessage, value: titleValue } = useField('title', validateTitle, {
  validateOnMount: true
})

function validateTitle(value: string) {
  if (!value) return 'Campo obrigatório.'
  if (value.length > 20) return 'Deve ter no máximo 20 caracteres.'
  return true
}

// Form Submit
async function onSubmit() {
  try {
    isLoading.value = true
    const boardId = route.params.id as string
    await new ListService().create(boardId, { title: titleValue.value })
    isAddListActive.value = false
    emmiter.emit()
  } catch (error) {
    toast.error('Ocorreu um erro ao criar a lista.')
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

// UI
const isAddListActive = ref(false)
const isLoading = ref(false)
const head = ref()

onClickOutside(head, () => {
  isAddListActive.value = false
})
</script>

<template>
  <div ref="head" class="space-y-2 w-60">
    <!-- List Head -->
    <div
      class="flex flex-row justify-between items-center p-3 h-8 rounded-lg bg-blue-200 hover:bg-blue-300 select-none cursor-pointer"
      @click="isAddListActive = true"
    >
      <span class="font-NotoSans font-medium text-xs text-blue-600">
        Adicionar outra lista
      </span>
      <span class="material-icons text-lg text-blue-600">add</span>
    </div>
    <!-- List title input -->
    <div v-if="isAddListActive" ref="cardTitleInput" class="relative">
      <Field
        v-model="titleValue"
        name="title"
        class="w-full block p-1.5 rounded-lg bg-white border border-slate-200 font-NotoSans font-medium text-sm text-slate-700 placeholder:text-slate-400"
        placeholder="Dê um título a esta lista"
        @keypress.enter="onSubmit()"
      />
      <button
        :disabled="!!errorMessage || isLoading"
        class="absolute bottom-1 right-1 w-12 h-6 bg-green-500 hover:bg-green-600 rounded-lg flex justify-center items-center disabled:bg-red-400 disabled:hover:bg-red-400"
        @click="onSubmit()"
      >
        <ButtonSpinner v-if="isLoading" />
        <span v-else class="font-NotoSans font-medium text-us text-white">
          Salvar
        </span>
      </button>
    </div>
    <!-- Error Message -->
    <div v-if="isAddListActive" class="flex justify-between">
      <div v-auto-animate class="flex w-full">
        <span
          v-if="errorMessage"
          class="text-us font-medium text-red-400 whitespace-nowrap"
        >
          {{ errorMessage }}
        </span>
      </div>
    </div>
  </div>
</template>
