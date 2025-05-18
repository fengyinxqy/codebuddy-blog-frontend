import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Comment } from '../types'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 设置评论列表
  const setComments = (newComments: Comment[]) => {
    comments.value = newComments
  }

  // 添加新评论
  const addComment = (comment: Comment) => {
    comments.value.push(comment)
  }

  // 删除评论
  const removeComment = (commentId: string) => {
    comments.value = comments.value.filter((c) => c.id !== commentId)
  }

  // 设置加载状态
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  // 设置错误信息
  const setError = (err: string | null) => {
    error.value = err
  }

  return {
    comments,
    isLoading,
    error,
    setComments,
    addComment,
    removeComment,
    setLoading,
    setError,
  }
})
