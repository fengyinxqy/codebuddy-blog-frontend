<script setup lang="ts">
import { ref } from 'vue'

import type { LoginParams, RegisterParams } from '@/types/auth'
import type { FormRules } from 'element-plus'

import { AuthService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'

const mode = ref<'login' | 'register'>('login')
const form = ref<LoginParams | RegisterParams>({
  email: '',
  password: '',
  ...(mode.value === 'register' ? { name: '' } : {}),
})
const isLoading = ref(false)
const error = ref('')
const authStore = useAuthStore()

const formRules: FormRules = {
  email: [
    { required: true, message: '邮箱是必填项', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
  ],
  name: [
    { required: true, message: '用户名是必填项', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码是必填项', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' },
  ],
}

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  error.value = ''
}

const submitForm = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = '邮箱和密码是必填项'
    return
  }

  if (mode.value === 'register' && !('name' in form.value && form.value.name)) {
    error.value = '注册需要填写用户名'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    let response
    if (mode.value === 'login') {
      response = await AuthService.login(form.value as LoginParams)
    } else {
      response = await AuthService.register(form.value as RegisterParams)
    }

    if (response.success && response.token && response.user) {
      authStore.setAuth(response.token, response.user)
    } else {
      error.value = response.message || 'Authentication failed'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Authentication error'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-form">
    <el-card shadow="hover">
      <template #header>
        <h3 class="text-center">
          {{ mode === 'login' ? '登录' : '注册' }}
        </h3>
      </template>

      <el-form
        @submit.prevent="submitForm"
        :model="form"
        :rules="formRules"
      >
        <el-form-item
          v-if="mode === 'register'"
          label="用户名"
          prop="name"
        >
          <el-input
            v-model="(form as RegisterParams).name"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="form.email"
            type="email"
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          class="mb-4"
        />

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="isLoading"
            class="w-full"
          >
            {{ mode === 'login' ? '登录' : '注册' }}
          </el-button>
        </el-form-item>

        <div class="text-center text-sm text-gray-500">
          <span>
            {{ mode === 'login' ? '没有账号？' : '已有账号？' }}
          </span>
          <el-button
            link
            type="primary"
            @click="toggleMode"
          >
            {{ mode === 'login' ? '注册' : '登录' }}
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.auth-form {
  @apply max-w-md mx-auto;
}
</style>
