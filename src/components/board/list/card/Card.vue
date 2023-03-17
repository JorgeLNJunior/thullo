<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import CardComentIcon from './Icons/CardComentIcon.vue'
import CardAttachmentsIcon from './Icons/CardAttachmentsIcon.vue'
import CardLabelIcon from './Icons/CardLabelIcon.vue'
// import CardMembersList from './CardMembersList.vue'
import { PropType } from 'vue'
import { Card } from '../../../../api/card.service'
// import { Member } from '../../../../api/member.service'

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true
  }
})

// const members = ref<Member[]>()
</script>

<template>
  <div
    class="flex w-60 bg-white shadow-md rounded-md hover:bg-slate-100"
    draggable="true"
  >
    <div class="p-2 space-y-3 w-full">
      <!-- <img
        v-if="props.card.cover"
        class="w-fit h-32 rounded-md"
        :src="props.cover"
        draggable="false"
      /> -->
      <div>
        <span class="font-NotoSans font-normal select-none">
          {{ props.card.title }}
        </span>
      </div>
      <div class="flex flex-row space-x-2">
        <CardLabelIcon color="red" name="Design" />
        <CardLabelIcon color="blue" name="Technical" />
      </div>
      <div class="flex flex-row justify-between w-full">
        <!-- <CardMembersList
          v-if="members"
          :profile-images="members.map((m) => m.user.profileImage)"
        /> -->
        <div class="flex flex-row space-x-3">
          <CardComentIcon :ammout="10" />
          <CardAttachmentsIcon :ammount="3" />
        </div>
      </div>
    </div>
  </div>
</template>
