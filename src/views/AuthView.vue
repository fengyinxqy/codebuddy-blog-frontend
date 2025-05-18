<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <div class="auth-view">
    <div class="max-w-xs mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6 text-center">欢迎来到博客系统</h1>
      <AuthForm />
    </div>
  </div>
</template>

<style scoped>
.auth-view {
  @apply min-h-screen flex items-center justify-center bg-gray-50;
}
</style>
