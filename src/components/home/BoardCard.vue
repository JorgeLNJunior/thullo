<script lang="ts" setup>
import { onBeforeMount, PropType, ref } from 'vue'
import { Board, BoardService } from '../../api/board.service'
import { Member } from '../../api/member.service'

const props = defineProps({
  board: {
    type: Object as PropType<Board>,
    required: true
  }
})

const members = ref<Member[]>()

onBeforeMount(async () => {
  members.value = await new BoardService().members(props.board.id, {
    take: 3
  })
})
</script>

<template>
  <router-link :to="`/board/${props.board.id}`" draggable="false">
    <div
      class="flex flex-col gb-white shadow-md rounded-lg space-y-3 p-2 mr-5 mb-5 min-w-fit max-w-fit hover:shadow-lg"
    >
      <img class="w-56 h-32 rounded-xl" :src="props.board.coverImage" />
      <span class="font-NotoSans font-medium text-base select-none">
        {{ props.board.title }}
      </span>
      <div
        v-if="members"
        class="flex flex-row items-center justify-between flex-wrap"
      >
        <div class="flex flex-row items-center space-x-2">
          <img
            v-for="(member, index) in members"
            :key="index"
            class="w-7 rounded-lg"
            :src="member.user.profileImage"
          />
        </div>
        <!-- <span
          class="font-NotoSans font-medium text-xs text-gray-500 select-none"
        >
          +? outros
        </span> -->
      </div>
    </div>
  </router-link>
</template>
