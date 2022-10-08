<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<style>
.Vue-Toastification__toast--info {
  background-color: rgb(59 130 246);
}
.Vue-Toastification__toast--success {
  background-color: rgb(34 197 94);
}
.Vue-Toastification__toast--error {
  background-color: rgb(239 68 68);
}
</style>
