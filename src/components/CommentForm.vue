<script setup lang="ts">
import { ref } from 'vue'

import { CommentService } from '@/services/comments'
import { useAuthStore } from '@/stores/auth'
import { useCommentsStore } from '@/stores/comments'

const props = defineProps<{
  articleId: string
}>()

const emit = defineEmits(['comment-added'])

const content = ref('')
const isLoading = ref(false)
const error = ref('')
const commentsStore = useCommentsStore()
const authStore = useAuthStore()

const submitComment = async () => {
  if (!content.value.trim()) return

  isLoading.value = true
  error.value = ''

  try {
    const newComment = await CommentService.createComment({
      content: content.value,
      articleId: props.articleId,
    })

    commentsStore.addComment(newComment)
    content.value = ''
    emit('comment-added', newComment)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to post comment'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="comment-form">
    <el-form @submit.prevent="submitComment">
      <el-form-item>
        <el-input
          v-model="content"
          type="textarea"
          :rows="3"
          placeholder="Write your comment..."
          :disabled="!authStore.isAuthenticated()"
        />
      </el-form-item>
      <el-alert
        v-if="error"
        :title="error"
        type="error"
        show-icon
        class="mb-4"
      />
      <el-button
        type="primary"
        :loading="isLoading"
        :disabled="!content.trim() || !authStore.isAuthenticated()"
        @click="submitComment"
      >
        Post Comment
      </el-button>
      <div
        v-if="!authStore.isAuthenticated()"
        class="mt-2 text-sm text-gray-500"
      >
        Please login to post a comment
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.comment-form {
  @apply mb-8;
}
</style>
