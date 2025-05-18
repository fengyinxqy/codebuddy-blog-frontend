import api from './api'

import type { Comment, CommentCreateParams, CommentResponse } from '@/types'

export const CommentService = {
  async getComments(articleId: string): Promise<Comment[]> {
    try {
      const response = await api.get(`/articles/${articleId}/comments`)
      return response.data
    } catch (error) {
      throw new Error(error as string)
    }
  },

  async createComment(params: CommentCreateParams): Promise<Comment> {
    try {
      const response = await api.post('/comments', params)
      return response.data
    } catch (error) {
      throw new Error(error as string)
    }
  },

  async deleteComment(commentId: string): Promise<void> {
    try {
      await api.delete(`/comments/${commentId}`)
    } catch (error) {
      throw new Error(error as string)
    }
  },
}
