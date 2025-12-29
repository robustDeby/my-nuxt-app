<template>
  <Header />
  <main>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
</script>

<style scoped>
main {
  padding: 20px;
  min-height: 70vh;
}
</style>
