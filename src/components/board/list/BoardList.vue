<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import ListCard from './card/ListCard.vue'

const isOptionsDropdownActive = ref<boolean>(false)
const isAddCardActive = ref<boolean>(false)

const optionsDropdown = ref(null)
const cardTitleInput = ref(null)

onClickOutside(optionsDropdown, () => {
  isOptionsDropdownActive.value = false
})
onClickOutside(cardTitleInput, () => {
  isAddCardActive.value = false
})

const props = defineProps({
  members: {
    type: Array<Record<string, string>>,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-transparent space-y-4">
    <div class="flex justify-between items-center w-60">
      <!-- Title -->
      <span class="font-poppins font-medium text-sm text-slate-800">
        Backlog
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
            <div class="flex w-full hover:bg-slate-50 cursor-pointer py-1.5">
              <span class="font-poppins font-medium text-us text-slate-500">
                Rename
              </span>
            </div>
            <div class="flex w-full hover:bg-slate-50 cursor-pointer">
              <span
                class="font-poppins font-medium text-us text-slate-500 py-1.5"
              >
                Delete this list
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <!-- Card List -->
    <div class="flex flex-col items-center space-y-3">
      <ListCard
        :members="props.members"
        title="GitHub Jobs Challenge"
        :cover="props.coverImage"
      />
      <ListCard :members="props.members" title="GitHub Jobs Challenge" />
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
          Add another card
        </span>
        <span class="material-icons text-lg text-blue-600">add</span>
      </div>
    </div>
  </div>
</template>
