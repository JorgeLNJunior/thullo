<script lang="ts" setup>
import CardComentIcon from './Icons/CardComentIcon.vue'
import CardAttachmentsIcon from './Icons/CardAttachmentsIcon.vue'
import CardLabelIcon from './Icons/CardLabelIcon.vue'
import CardMembersList from './CardMembersList.vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  members: {
    type: Array<Record<string, string>>,
    required: true
  },
  // eslint-disable-next-line vue/require-default-prop
  cover: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div
    class="flex w-60 bg-white shadow-md rounded-md hover:bg-slate-100"
    draggable="true"
  >
    <div class="p-2 space-y-3 w-full">
      <img
        v-if="props.cover"
        class="w-fit h-32 rounded-md"
        :src="props.cover"
        draggable="false"
      />
      <div>
        <span class="font-NotoSans font-normal select-none">
          {{ props.title }}
        </span>
      </div>
      <div class="flex flex-row space-x-2">
        <CardLabelIcon color="red" name="Design" />
        <CardLabelIcon color="blue" name="Technical" />
      </div>
      <div class="flex flex-row justify-between w-full">
        <CardMembersList
          :profile-images="props.members.map((m) => m.profileImage)"
        />
        <div class="flex flex-row space-x-3">
          <CardComentIcon :ammout="10" />
          <CardAttachmentsIcon :ammount="3" />
        </div>
      </div>
    </div>
  </div>
</template>
