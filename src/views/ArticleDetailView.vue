<script setup lang="ts">
import { Calendar, View, Star, Share, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id

// 模拟文章数据
const article = ref({
  id: articleId,
  title: '如何使用Vue3和TypeScript构建现代化博客系统',
  cover: 'https://via.placeholder.com/1200x600',
  publishDate: '2024-05-17',
  updateDate: '2024-05-18',
  author: {
    name: '博主昵称',
    avatar: 'https://via.placeholder.com/50',
    bio: '前端开发工程师',
  },
  category: {
    id: 1,
    name: '技术',
  },
  tags: [
    { id: 1, name: 'Vue.js' },
    { id: 2, name: 'TypeScript' },
    { id: 13, name: 'Element Plus' },
  ],
  content: `
  <h2>引言</h2>
  <p>在当今数字化时代，拥有一个个人博客系统是展示个人能力和分享知识的重要方式。</p>
  `,
  views: 256,
  likes: 42,
  comments: 15,
})

// 点赞文章
const likeArticle = () => {
  article.value.likes++
  ElMessage.success('点赞成功')
}

// 分享文章
const shareArticle = () => {
  ElMessage.success('分享链接已复制到剪贴板')
}

onMounted(() => {
  console.log(`加载文章ID: ${articleId}`)
  document.title = `${article.value.title} - Blog`
})
</script>

<template>
  <div class="article-detail-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <div class="meta-left">
              <div class="author-info">
                <el-avatar
                  :size="40"
                  :src="article.author.avatar"
                />
                <span class="author-name">{{ article.author.name }}</span>
              </div>
              <div class="publish-info">
                <el-icon><Calendar /></el-icon>
                <span>{{ article.publishDate }}</span>
                <el-tooltip
                  content="最后更新时间"
                  placement="top"
                >
                  <span class="update-date">(更新于 {{ article.updateDate }})</span>
                </el-tooltip>
              </div>
            </div>
            <div class="meta-right">
              <el-tag
                size="small"
                type="info"
                >{{ article.category.name }}</el-tag
              >
              <span class="views"
                ><el-icon><View /></el-icon> {{ article.views }}</span
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-lg"
    >
      <el-col :md="16">
        <el-card
          shadow="hover"
          class="article-card"
        >
          <div class="article-cover">
            <el-image
              :src="article.cover"
              fit="cover"
              alt="文章封面"
            />
          </div>

          <div
            class="article-content"
            v-html="article.content"
          />

          <div class="article-tags">
            <el-tag
              v-for="tag in article.tags"
              :key="tag.id"
              class="tag-item"
              effect="plain"
            >
              {{ tag.name }}
            </el-tag>
          </div>

          <div class="article-actions">
            <el-button
              type="primary"
              @click="likeArticle"
              :icon="Star"
            >
              点赞 ({{ article.likes }})
            </el-button>
            <el-button
              @click="shareArticle"
              :icon="Share"
            >
              分享
            </el-button>
            <el-button
              type="warning"
              @click="$router.push(`/article/edit/${article.id}`)"
              :icon="Edit"
            >
              编辑
            </el-button>
          </div>

          <div class="article-author-card">
            <div class="author-avatar">
              <el-avatar
                :size="60"
                :src="article.author.avatar"
              />
            </div>
            <div class="author-info">
              <h3 class="author-name">{{ article.author.name }}</h3>
              <p class="author-bio">{{ article.author.bio }}</p>
              <el-button
                type="primary"
                size="small"
                plain
                >关注作者</el-button
              >
            </div>
          </div>

          <!-- 评论区域 -->
          <div class="comments-section">
            <h3 class="section-title">评论 ({{ article.comments }})</h3>
            <CommentForm :articleId="article.id" />
            <CommentList
              :articleId="article.id"
              class="mt-6"
            />
          </div>
        </el-card>
      </el-col>

      <el-col :md="8">
        <!-- 相关文章和目录等侧边栏内容 -->
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.article-detail-view {
  padding: 24px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.article-header {
  border-bottom: 1px solid var(--el-border-color-light);
  margin-bottom: 32px;
  padding-bottom: 16px;

  .article-title {
    font-size: 2.2rem;
    margin: 0 0 16px;
    line-height: 1.3;
    color: var(--el-text-color-primary);
    font-weight: 600;
  }

  .article-meta {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--el-text-color-secondary);
    font-size: 14px;

    .meta-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 24px;

      .author-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        .author-name {
          font-weight: 500;
          color: var(--el-text-color-primary);
        }
      }

      .publish-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        .el-icon {
          font-size: 16px;
        }

        .update-date {
          color: var(--el-text-color-secondary);
          font-size: 12px;
        }
      }
    }

    .meta-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;

      .views {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }
    }
  }
}

.article-card {
  border-radius: 12px;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--el-box-shadow);
  }

  .article-cover {
    border-radius: 8px;
    margin-bottom: 32px;
    overflow: hidden;
    box-shadow: var(--el-box-shadow-light);

    .el-image {
      width: 100%;
      display: block;
    }
  }

  .article-content {
    color: var(--el-text-color-primary);
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 32px;

    :deep(pre) {
      background-color: #f6f8fa;
      border-radius: 6px;
      padding: 16px;
      overflow-x: auto;
    }

    :deep(code) {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 14px;
    }

    :deep(img) {
      max-width: 100%;
      border-radius: 8px;
      margin: 16px 0;
    }
  }

  .article-tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;

    .tag-item {
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--el-box-shadow-light);
      }
    }
  }

  .article-actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color-light);
    border-top: 1px solid var(--el-border-color-light);
    gap: 24px;
    margin-bottom: 32px;
    padding: 16px 0;

    .el-button {
      padding: 12px 24px;
    }
  }

  .article-author-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--el-bg-color-page);
    border-radius: 12px;
    gap: 24px;
    padding: 24px;
    margin-bottom: 32px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: var(--el-box-shadow-light);
    }

    .author-info {
      .author-name {
        font-size: 18px;
        margin: 0 0 8px;
        font-weight: 600;
      }

      .author-bio {
        color: var(--el-text-color-secondary);
        margin: 0 0 16px;
        font-size: 14px;
      }

      .el-button {
        padding: 8px 16px;
      }
    }
  }

  .comments-section {
    margin-top: 40px;

    .section-title {
      font-size: 20px;
      margin-bottom: 24px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      display: flex;
      align-items: center;
      gap: 8px;

      .el-icon {
        color: var(--el-color-primary);
      }
    }
  }
}

@media (max-width: 768px) {
  .article-detail-view {
    padding: 16px;
  }

  .article-header {
    .article-title {
      font-size: 1.8rem;
    }

    .article-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      .meta-left {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .meta-right {
        width: 100%;
        justify-content: flex-start;
        margin-top: 12px;
      }
    }
  }

  .article-card {
    .article-actions {
      flex-wrap: wrap;
      gap: 12px;
    }

    .article-author-card {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
