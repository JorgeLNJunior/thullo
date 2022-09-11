<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import ListCard from './card/ListCard.vue'

const isOptionsDropdownActive = ref<boolean>(false)
const optionsDropdown = ref(null)

onClickOutside(optionsDropdown, () => {
  isOptionsDropdownActive.value = false
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
      <span class="font-poppins font-medium text-sm text-slate-800">
        Backlog
      </span>
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
    <div class="flex flex-col items-center space-y-3">
      <ListCard
        :members="props.members"
        title="GitHub Jobs Challenge"
        :cover="props.coverImage"
      />
      <ListCard :members="props.members" title="GitHub Jobs Challenge" />
    </div>
  </div>
</template>
