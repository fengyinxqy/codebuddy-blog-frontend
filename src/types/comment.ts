export interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    avatar?: string
  }
}

export interface CommentCreateParams {
  content: string
  articleId: string
}

export interface CommentResponse {
  success: boolean
  data?: Comment[]
  message?: string
}
