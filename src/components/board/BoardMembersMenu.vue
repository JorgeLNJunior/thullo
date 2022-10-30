<script lang="ts" setup>
import { Member } from '../../api/member.service'

const props = defineProps({
  members: {
    type: Array<Member>,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-row space-x-3">
    <img
      v-for="member in props.members"
      :key="member.userId"
      :src="member.user.profileImage"
      class="rounded-lg w-8 h-8"
    />
  </div>
  <button
    class="flex items-center justify-center bg-blue-500 px-2 rounded-lg h-8 space-x-2 hover:bg-blue-600"
  >
    <span class="material-icons text-white font-medium text-sm">add</span>
  </button>
</template>
