<script setup lang="ts">
import { computed, onMounted } from 'vue'

import type { Comment } from '@/types/comment'

import { CommentService } from '@/services/comments'
import { useAuthStore } from '@/stores/auth'
import { useCommentsStore } from '@/stores/comments'

const props = defineProps<{
  articleId: string
}>()

const commentsStore = useCommentsStore()
const authStore = useAuthStore()

// 获取当前文章的评论
const comments = computed(() => commentsStore.comments)
const isLoading = computed(() => commentsStore.isLoading)
// const error = computed(() => commentsStore.error)

// 检查是否是评论作者
const isAuthor = (comment: Comment) => {
  return authStore.user?.id === comment.author.id
}

// 删除评论
const deleteComment = async (commentId: string) => {
  try {
    await CommentService.deleteComment(commentId)
    commentsStore.removeComment(commentId)
  } catch (err) {
    commentsStore.setError(err instanceof Error ? err.message : 'Failed to delete comment')
  }
}

// 初始化加载评论
onMounted(async () => {
  commentsStore.setLoading(true)
  try {
    const comments = await CommentService.getComments(props.articleId)
    commentsStore.setComments(comments)
  } catch (err) {
    commentsStore.setError(err instanceof Error ? err.message : 'Failed to load comments')
  } finally {
    commentsStore.setLoading(false)
  }
})
</script>

<template>
  <div class="comment-list">
    <!-- <el-alert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      class="mb-4"
    /> -->

    <el-skeleton
      :loading="isLoading"
      animated
    >
      <template #default>
        <div
          v-if="comments.length === 0"
          class="text-gray-500 py-4"
        >
          No comments yet. Be the first to comment!
        </div>

        <div
          v-else
          class="space-y-4"
        >
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="comment-item"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0">
                <el-avatar
                  :src="comment.author.avatar"
                  :size="40"
                >
                  {{ comment.author.name.charAt(0).toUpperCase() }}
                </el-avatar>
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-medium">{{ comment.author.name }}</span>
                    <span class="text-xs text-gray-500 ml-2">
                      {{ new Date(comment.createdAt).toLocaleString() }}
                    </span>
                  </div>
                  <el-button
                    v-if="isAuthor(comment)"
                    type="danger"
                    size="small"
                    text
                    @click="deleteComment(comment.id)"
                  >
                    Delete
                  </el-button>
                </div>
                <div class="mt-1 text-gray-800">
                  {{ comment.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.comment-item {
  @apply p-4 border-b border-gray-100 last:border-b-0;
}
</style>
