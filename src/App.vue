<template>
  <AppHeader />
  <div class="layout">
    <AppSidebar />
    <main style="padding: 32px 40px; max-width: 840px;">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
</script>
