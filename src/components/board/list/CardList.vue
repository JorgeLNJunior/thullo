<script lang="ts" setup>
import { computed } from 'vue'
import { onClickOutside, useEventBus } from '@vueuse/core'
import { ref, PropType, onBeforeMount } from 'vue'
import { Card as CardType } from '../../../api/card.service'
import { List, ListService, UpdateListData } from '../../../api/list.service'
import Card from './card/Card.vue'
import { useToast } from 'vue-toastification'
import { Events } from '../../../events/events.enum'

const toast = useToast()
const emmiter = useEventBus(Events.RELOAD_BOARD_LISTS)

const props = defineProps({
  list: {
    type: Object as PropType<List>,
    required: true
  }
})

const cards = ref<CardType[]>()

const updateListData = ref<UpdateListData>({
  title: props.list.title
})

// Methods
async function remove() {
  try {
    isDeleteBtnDisabled.value = true
    await new ListService().delete(props.list.boardId, props.list.id)
    emmiter.emit()
  } catch (error) {
    toast.error('Ocorreu um erro ao excluir a lista')
    console.log(error)
  } finally {
    isDeleteBtnDisabled.value = false
  }
}

async function renameList() {
  try {
    await new ListService().update(
      props.list.boardId,
      props.list.id,
      updateListData.value
    )
    emmiter.emit()
    isRenameListActive.value = false
  } catch (error) {
    toast.error('Ocorreu um erro ao excluir a lista')
    console.log(error)
  }
}

// Hooks
onBeforeMount(async () => {
  try {
    cards.value = await new ListService().cards(props.list.id)
  } catch (error) {
    console.log(error)
  }
})

// Data
const sortedCards = computed(() => {
  if (cards.value) {
    return Array.from(cards.value).sort((a, b) =>
      a.position > b.position ? 1 : -1
    )
  }
  return null
})

// UI
const isOptionsDropdownActive = ref<boolean>(false)
const isAddCardActive = ref<boolean>(false)
const isRenameListActive = ref<boolean>(false)
const isDeleteBtnDisabled = ref<boolean>(false)

const optionsDropdown = ref(null)
const cardTitleInput = ref(null)
const cardRenameTitleInput = ref(null)

onClickOutside(optionsDropdown, () => {
  isOptionsDropdownActive.value = false
})
onClickOutside(cardTitleInput, () => {
  isAddCardActive.value = false
})
onClickOutside(cardRenameTitleInput, () => {
  isRenameListActive.value = false
})
</script>

<template>
  <div class="bg-transparent space-y-4">
    <div class="flex justify-between items-center w-60">
      <!-- Rename Title Input -->
      <input
        v-if="isRenameListActive"
        ref="cardRenameTitleInput"
        v-model="updateListData.title"
        name="title"
        class="w-full h-6 p-1.5 block rounded-lg bg-white outline outline-slate-200 font-NotoSans font-medium text-sm text-slate-700 placeholder:text-slate-400"
        placeholder="Dê um título a esta lista"
        @keypress.enter="renameList()"
      />
      <!-- Title -->
      <span
        v-else
        class="font-poppins font-medium text-sm text-slate-800"
        @click="isRenameListActive = true"
      >
        {{ props.list.title }}
      </span>
      <!-- List Options Menu -->
      <div ref="optionsDropdown" class="relative inline-block">
        <button
          class="flex items-center justify-center"
          @click="isOptionsDropdownActive = !isOptionsDropdownActive"
        >
          <span class="material-icons text-slate-600 font-medium">
            more_horiz
          </span>
        </button>
        <Transition
          name="options-dropdown"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
        >
          <div
            v-if="isOptionsDropdownActive"
            class="flex flex-col w-36 absolute left-0 p-2 mt-1 bg-white rounded-xl border-slate-300 border divide-y"
          >
            <div
              class="flex w-full hover:bg-slate-50 cursor-pointer py-1.5"
              @click="isRenameListActive = true"
            >
              <span class="font-poppins font-medium text-us text-slate-500">
                Renomear
              </span>
            </div>
            <button
              :disabled="isDeleteBtnDisabled"
              class="flex w-full hover:bg-slate-50 cursor-pointer"
              @click="remove()"
            >
              <span
                class="font-poppins font-medium text-us text-slate-500 py-1.5"
              >
                Deletar
              </span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <!-- Card List -->
    <div v-if="cards" class="flex flex-col items-center space-y-3">
      <Card v-for="card in sortedCards" :key="card.id" :card="card" />
    </div>
    <!-- Add Card Button -->
    <div class="space-y-2">
      <div v-if="isAddCardActive" ref="cardTitleInput" class="relative">
        <input
          class="w-full block p-2 rounded-lg bg-white border border-slate-200 font-NotoSans font-medium text-sm text-slate-700 placeholder:text-slate-400"
          placeholder="Enter a title for this card"
        />
        <button
          class="absolute bottom-1.5 right-1 w-12 h-6 bg-green-500 hover:bg-green-600 rounded-lg flex justify-center items-center"
        >
          <span class="font-NotoSans font-medium text-us text-white">Save</span>
        </button>
      </div>
      <div
        class="flex flex-row justify-between items-center p-3 h-8 rounded-lg bg-blue-200 hover:bg-blue-300 select-none cursor-pointer"
        @click="isAddCardActive = true"
      >
        <span class="font-NotoSans font-medium text-xs text-blue-600">
          Adicionar outro cartão
        </span>
        <span class="material-icons text-lg text-blue-600">add</span>
      </div>
    </div>
  </div>
</template>
