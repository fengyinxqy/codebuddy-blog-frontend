<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { AuthService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

const logout = async () => {
  try {
    await AuthService.logout()
    authStore.clearAuth()
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// 确保用户已登录
onMounted(() => {
  if (!authStore.isAuthenticated()) {
    router.push({ name: 'login', query: { redirect: '/profile' } })
  }
})
</script>

<template>
  <div class="profile-view">
    <el-card class="max-w-2xl mx-auto">
      <template #header>
        <h2 class="text-xl font-semibold">My Profile</h2>
      </template>

      <div
        v-if="authStore.user"
        class="space-y-4"
      >
        <div class="flex items-center space-x-4">
          <el-avatar
            :size="80"
            :src="authStore.user.avatar"
          >
            {{ authStore.user.name.charAt(0).toUpperCase() }}
          </el-avatar>
          <div>
            <h3 class="text-lg font-medium">{{ authStore.user.name }}</h3>
            <p class="text-gray-600">{{ authStore.user.email }}</p>
            <p class="text-sm text-gray-500">
              Member since {{ new Date(authStore.user.createdAt).toLocaleDateString() }}
            </p>
          </div>
        </div>

        <el-divider />

        <div class="grid grid-cols-2 gap-4">
          <div class="stat-card">
            <div class="text-gray-500">Articles</div>
            <div class="text-2xl font-bold">12</div>
          </div>
          <div class="stat-card">
            <div class="text-gray-500">Comments</div>
            <div class="text-2xl font-bold">34</div>
          </div>
        </div>

        <el-divider />

        <div class="flex justify-end">
          <el-button
            type="danger"
            :loading="isLoading"
            @click="logout"
          >
            Logout
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.profile-view {
  @apply py-8;
}

.stat-card {
  @apply p-4 border rounded-lg;
}
</style>
