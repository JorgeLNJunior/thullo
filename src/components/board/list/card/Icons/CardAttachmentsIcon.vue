<script lang="ts" setup>
const props = defineProps({
  ammount: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center space-x-1 select-none">
    <span class="material-icons text-slate-400 font-medium text-us">
      attachment
    </span>
    <span class="font-NotoSans font-medium text-us text-slate-400">
      {{ props.ammount }}
    </span>
  </div>
</template>
