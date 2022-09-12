<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const visibilityDropdown = ref(null)
const isDropdownActive = ref(true)

onClickOutside(visibilityDropdown, () => {
  isDropdownActive.value = false
})
</script>

<template>
  <div ref="visibilityDropdown" class="relative inline-block">
    <button
      class="flex items-center justify-center bg-gray-200 px-2 h-8 rounded-lg space-x-2 hover:bg-gray-300"
      @click="isDropdownActive = !isDropdownActive"
    >
      <span class="material-icons text-gray-500 font-medium text-sm">lock</span>
      <span class="font-popins font-medium text-gray-500 text-sm">Private</span>
    </button>
    <Transition
      name="visibility-dropdown"
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div
        v-if="isDropdownActive"
        class="flex flex-col w-56 absolute left-0 p-2 mt-1 bg-white rounded-xl border-slate-300 border space-y-2"
      >
        <div class="flex flex-col">
          <span
            class="font-poppins font-semibold text-xs text-slate-800 select-none"
          >
            Visibility
          </span>
          <span
            class="font-NotoSans font-normal text-xs text-slate-500 select-none"
          >
            Choose who can see to this board.
          </span>
        </div>
        <!-- Public -->
        <div
          class="flex flex-col space-y-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <div class="flex items-center space-x-1.5">
            <span
              class="material-icons text-slate-700 font-medium text-xs select-none"
            >
              public
            </span>
            <span
              class="font-NotoSans font-medium text-xs text-slate-700 select-none"
            >
              Public
            </span>
          </div>
          <span
            class="font-NotoSans font-normal text-us text-slate-500 select-none"
          >
            Anyone on the internet can see this.
          </span>
        </div>
        <!-- Private -->
        <div
          class="flex flex-col space-y-1 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <div class="flex items-center space-x-1.5">
            <span
              class="material-icons text-slate-700 font-medium text-xs select-none"
            >
              lock
            </span>
            <span
              class="font-NotoSans font-medium text-xs text-slate-700 select-none"
            >
              Private
            </span>
          </div>
          <span
            class="font-NotoSans font-normal text-us text-slate-500 select-none"
          >
            Only board members can see this
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>
