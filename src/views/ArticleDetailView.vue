<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Calendar, View, Star, Share, ThumbUp, ChatDotRound, Edit } from '@element-plus/icons-vue'

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
                <el-avatar :size="40" :src="article.author.avatar" />
                <span class="author-name">{{ article.author.name }}</span>
              </div>
              <div class="publish-info">
                <el-icon><Calendar /></el-icon>
                <span>{{ article.publishDate }}</span>
                <el-tooltip content="最后更新时间" placement="top">
                  <span class="update-date">(更新于 {{ article.updateDate }})</span>
                </el-tooltip>
              </div>
            </div>
            <div class="meta-right">
              <el-tag size="small" type="info">{{ article.category.name }}</el-tag>
              <span class="views"
                ><el-icon><View /></el-icon> {{ article.views }}</span
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-lg">
      <el-col :md="16">
        <el-card shadow="hover" class="article-card">
          <div class="article-cover">
            <el-image :src="article.cover" fit="cover" alt="文章封面" />
          </div>

          <div class="article-content" v-html="article.content"></div>

          <div class="article-tags">
            <el-tag v-for="tag in article.tags" :key="tag.id" class="tag-item" effect="plain">
              {{ tag.name }}
            </el-tag>
          </div>

          <div class="article-actions">
            <el-button type="primary" @click="likeArticle" :icon="Star">
              点赞 ({{ article.likes }})
            </el-button>
            <el-button @click="shareArticle" :icon="Share"> 分享 </el-button>
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
              <el-avatar :size="60" :src="article.author.avatar" />
            </div>
            <div class="author-info">
              <h3 class="author-name">{{ article.author.name }}</h3>
              <p class="author-bio">{{ article.author.bio }}</p>
              <el-button type="primary" size="small" plain>关注作者</el-button>
            </div>
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
  padding: $spacing-base 0;
}

.article-header {
  border-bottom: 1px solid $border-color-light;
  margin-bottom: $spacing-large;
  padding-bottom: $spacing-base;

  .article-title {
    font-size: 2rem;
    margin: 0 0 $spacing-base;
  }

  .article-meta {
    @include flex(row, space-between, center);
    color: $text-secondary;
    font-size: $font-size-small;

    .meta-left {
      @include flex(row, flex-start, center);
      gap: $spacing-large;

      .author-info {
        @include flex(row, flex-start, center);
        gap: $spacing-small;

        .author-name {
          font-weight: 500;
        }
      }

      .publish-info {
        @include flex(row, flex-start, center);
        gap: $spacing-small;

        .update-date {
          color: $text-secondary;
          font-size: $font-size-extra-small;
        }
      }
    }

    .meta-right {
      @include flex(row, flex-end, center);
      gap: $spacing-base;

      .views {
        @include flex(row, flex-start, center);
        gap: 4px;
      }
    }
  }
}

.article-card {
  .article-cover {
    border-radius: $border-radius-base;
    margin-bottom: $spacing-large;
    overflow: hidden;

    .el-image {
      width: 100%;
    }
  }

  .article-content {
    color: $text-primary;
    font-size: $font-size-medium;
    line-height: 1.8;
    margin-bottom: $spacing-large;
  }

  .article-tags {
    @include flex(row, flex-start, center);
    flex-wrap: wrap;
    gap: $spacing-small;
    margin-bottom: $spacing-large;
  }

  .article-actions {
    @include flex(row, center, center);
    border-bottom: 1px solid $border-color-light;
    border-top: 1px solid $border-color-light;
    gap: $spacing-large;
    margin-bottom: $spacing-large;
    padding: $spacing-base 0;
  }

  .article-author-card {
    @include flex(row, flex-start, center);
    background-color: $background-color-light;
    border-radius: $border-radius-base;
    gap: $spacing-large;
    padding: $spacing-large;

    .author-info {
      .author-name {
        font-size: $font-size-large;
        margin: 0 0 $spacing-small;
      }

      .author-bio {
        color: $text-secondary;
        margin: 0 0 $spacing-base;
      }
    }
  }
}
</style>
