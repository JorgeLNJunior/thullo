<script lang="ts" setup>
const props = defineProps({
  profileImages: {
    type: Array<string>,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-row space-x-2">
    <img
      v-for="(image, index) in props.profileImages.slice(0, 3)"
      :key="index"
      :src="image"
      class="rounded-lg w-7"
    />
    <button
      class="flex items-center justify-center bg-blue-500 px-1.5 py-0.5 rounded-lg space-x-2 hover:bg-blue-600"
    >
      <span class="material-icons text-white font-medium text-base">add</span>
    </button>
  </div>
</template>
