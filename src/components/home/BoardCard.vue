<script lang="ts" setup>
import { ref } from 'vue'

const board = ref({
  // eslint-disable-next-line prettier/prettier
  coverImage: 'https://images.unsplash.com/photo-1660461712603-ffa53b3a3303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUzMDY4&ixlib=rb-1.2.1&q=80&w=1080',
  title: 'DevChallenges Board',
  members: [
    {
      profileImage:
        'https://images.unsplash.com/photo-1659462083377-761311a525ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUyMzI2&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1660314176057-d01f4ec7d4ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUyMzY5&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      profileImage:
        'https://images.unsplash.com/photo-1660392750311-f50eeaa6c517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxyYW5kb218fHx8fHx8fHwxNjYyMDUyMzkz&ixlib=rb-1.2.1&q=80&w=400'
    }
  ]
})
</script>

<template>
  <div
    class="flex flex-col gb-white shadow-md rounded-lg space-y-3 p-3 m-5 min-w-fit"
  >
    <img class="w-56 rounded-lg" :src="board.coverImage" />
    <span class="font-NotoSans font-medium">{{ board.title }}</span>
    <div class="flex flex-row items-center flex-wrap">
      <img
        v-for="(member, index) in board.members"
        :key="index"
        class="w-12 rounded-lg px-2"
        :src="member.profileImage"
      />
      <span class="font-NotoSans font-light text-sm text-gray-500">
        +5 others
      </span>
    </div>
  </div>
</template>
