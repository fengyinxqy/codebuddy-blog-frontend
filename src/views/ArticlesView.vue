<template>
  <div class="articles-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="page-header">
          <h1 class="page-title">文章列表</h1>
          <div class="page-actions">
            <el-input
              v-model="searchQuery"
              placeholder="搜索文章..."
              class="search-input"
              :prefix-icon="Search"
              clearable
            />
            <el-select
              v-model="sortBy"
              placeholder="排序方式"
              class="sort-select"
            >
              <el-option
                label="最新发布"
                value="newest"
              />
              <el-option
                label="最多阅读"
                value="most-read"
              />
              <el-option
                label="最多点赞"
                value="most-liked"
              />
            </el-select>
            <el-button
              type="primary"
              @click="$router.push('/article/edit')"
            >
              写文章
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-lg"
    >
      <el-col :md="18">
        <div class="article-list">
          <el-card
            v-for="i in 5"
            :key="i"
            class="article-item"
            shadow="hover"
          >
            <div class="article-layout">
              <div class="article-image">
                <el-image
                  src="https://via.placeholder.com/300x200"
                  fit="cover"
                  alt="文章封面"
                />
              </div>
              <div class="article-content">
                <div class="article-meta">
                  <el-tag
                    size="small"
                    type="info"
                    >技术</el-tag
                  >
                  <span class="date">{{ new Date().toLocaleDateString() }}</span>
                </div>
                <h3 class="article-title">
                  <router-link :to="'/article/1'">这是一篇示例文章标题 {{ i }}</router-link>
                </h3>
                <p class="article-excerpt text-ellipsis-3">
                  这是一篇示例文章的摘要内容，展示了文章的主要内容和观点。这是一篇示例文章的摘要内容，展示了文章的主要内容和观点。
                  这是一篇示例文章的摘要内容，展示了文章的主要内容和观点。这是一篇示例文章的摘要内容，展示了文章的主要内容和观点。
                </p>
                <div class="article-footer">
                  <div class="article-author">
                    <el-avatar
                      size="small"
                      src="https://via.placeholder.com/40"
                    />
                    <span>作者名称</span>
                  </div>
                  <div class="article-stats">
                    <span
                      ><el-icon><View /></el-icon> 100</span
                    >
                    <span
                      ><el-icon><Star /></el-icon> 25</span
                    >
                    <span
                      ><el-icon><ChatDotRound /></el-icon> 10</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </el-card>

          <div class="pagination-container">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50"
              :page-size="10"
            />
          </div>
        </div>
      </el-col>

      <el-col :md="6">
        <div class="sidebar">
          <el-card
            class="sidebar-card"
            shadow="hover"
          >
            <template #header>
              <div class="card-header">
                <h3>热门分类</h3>
              </div>
            </template>
            <div class="category-list">
              <router-link
                to="/categories/tech"
                class="category-item"
              >
                <span class="category-name">技术</span>
                <el-tag
                  size="small"
                  type="info"
                  >25</el-tag
                >
              </router-link>
              <router-link
                to="/categories/design"
                class="category-item"
              >
                <span class="category-name">设计</span>
                <el-tag
                  size="small"
                  type="info"
                  >18</el-tag
                >
              </router-link>
              <router-link
                to="/categories/life"
                class="category-item"
              >
                <span class="category-name">生活</span>
                <el-tag
                  size="small"
                  type="info"
                  >12</el-tag
                >
              </router-link>
              <router-link
                to="/categories/travel"
                class="category-item"
              >
                <span class="category-name">旅行</span>
                <el-tag
                  size="small"
                  type="info"
                  >8</el-tag
                >
              </router-link>
            </div>
          </el-card>

          <el-card
            class="sidebar-card mt-md"
            shadow="hover"
          >
            <template #header>
              <div class="card-header">
                <h3>热门标签</h3>
              </div>
            </template>
            <div class="tag-cloud">
              <router-link
                to="/tags/vue"
                class="tag-item"
              >
                <el-tag>Vue.js</el-tag>
              </router-link>
              <router-link
                to="/tags/typescript"
                class="tag-item"
              >
                <el-tag>TypeScript</el-tag>
              </router-link>
              <router-link
                to="/tags/javascript"
                class="tag-item"
              >
                <el-tag>JavaScript</el-tag>
              </router-link>
              <router-link
                to="/tags/css"
                class="tag-item"
              >
                <el-tag>CSS</el-tag>
              </router-link>
              <router-link
                to="/tags/html"
                class="tag-item"
              >
                <el-tag>HTML</el-tag>
              </router-link>
              <router-link
                to="/tags/vite"
                class="tag-item"
              >
                <el-tag>Vite</el-tag>
              </router-link>
              <router-link
                to="/tags/element-plus"
                class="tag-item"
              >
                <el-tag>Element Plus</el-tag>
              </router-link>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Search, View, Star, ChatDotRound } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchQuery = ref('')
const sortBy = ref('newest')
</script>

<style lang="scss" scoped>
.articles-view {
  padding: $spacing-base 0;
}

.page-header {
  @include flex(row, space-between, center);
  border-bottom: 1px solid $border-color-light;
  margin-bottom: $spacing-large;
  padding-bottom: $spacing-base;

  .page-title {
    font-size: $font-size-extra-large;
    margin: 0;
  }

  .page-actions {
    @include flex(row, flex-end, center);
    gap: $spacing-base;

    .search-input {
      width: 250px;
    }

    .sort-select {
      width: 150px;
    }
  }
}

.article-list {
  .article-item {
    margin-bottom: $spacing-base;

    .article-layout {
      @include flex(row, flex-start, flex-start);
      gap: $spacing-base;
    }

    .article-image {
      flex-shrink: 0;
      width: 200px;

      .el-image {
        border-radius: $border-radius-base;
        height: 140px;
        width: 100%;
      }
    }

    .article-content {
      flex-grow: 1;
    }

    .article-meta {
      @include flex(row, flex-start, center);
      color: $text-secondary;
      font-size: $font-size-small;
      gap: $spacing-small;
      margin-bottom: $spacing-small;
    }

    .article-title {
      font-size: $font-size-large;
      margin-bottom: $spacing-small;
      margin-top: 0;

      a {
        color: $text-primary;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: $primary-color;
        }
      }
    }

    .article-excerpt {
      color: $text-regular;
      font-size: $font-size-base;
      margin-bottom: $spacing-base;
    }

    .article-footer {
      @include flex(row, space-between, center);
      margin-top: $spacing-small;

      .article-author {
        @include flex(row, flex-start, center);
        gap: $spacing-small;
      }

      .article-stats {
        color: $text-secondary;
        font-size: $font-size-small;

        span {
          margin-left: $spacing-small;

          .el-icon {
            margin-right: 2px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}

.pagination-container {
  @include flex(row, center, center);
  margin-top: $spacing-large;
}

.sidebar {
  .sidebar-card {
    .card-header {
      h3 {
        font-size: $font-size-medium;
        margin: 0;
      }
    }
  }

  .category-list {
    .category-item {
      @include flex(row, space-between, center);
      border-bottom: 1px solid $border-color-lighter;
      color: $text-regular;
      padding: $spacing-small 0;
      text-decoration: none;
      transition: color 0.3s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        color: $primary-color;
      }
    }
  }

  .tag-cloud {
    @include flex(row, flex-start, center);
    flex-wrap: wrap;
    gap: $spacing-small;

    .tag-item {
      margin-bottom: $spacing-small;
      text-decoration: none;
    }
  }
}

// 响应式调整
@include responsive('md-down') {
  .page-header {
    flex-direction: column;
    align-items: flex-start;

    .page-title {
      margin-bottom: $spacing-base;
    }

    .page-actions {
      width: 100%;
    }
  }

  .article-list {
    .article-item {
      .article-layout {
        flex-direction: column;

        .article-image {
          width: 100%;

          .el-image {
            height: 200px;
          }
        }
      }
    }
  }
}
</style>
