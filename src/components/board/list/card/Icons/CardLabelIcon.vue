<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    class="flex items-center rounded-lg h-4 p-2.5 select-none"
    :class="'bg-' + props.color + '-300'"
  >
    <span
      class="font-NotoSans font-medium text-us"
      :class="'text-' + props.color + '-600'"
    >
      {{ props.name }}
    </span>
  </div>
</template>
