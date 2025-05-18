<script setup lang="ts">
// 首页组件
</script>

<template>
  <div class="home-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="welcome-card">
          <template #header>
            <div class="card-header">
              <h2>欢迎来到我的博客</h2>
            </div>
          </template>
          <div class="card-content">
            <p>这是一个使用Vue3、TypeScript和Element Plus构建的现代化博客系统。</p>
            <p>您可以在这里分享您的想法、技术文章和生活感悟。</p>
            <div class="actions mt-lg">
              <el-button type="primary" size="large">开始写作</el-button>
              <el-button size="large">浏览文章</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-lg">
      <el-col :span="24">
        <h3 class="section-title">最新文章</h3>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-md">
      <el-col :xs="24" :sm="12" :md="8" v-for="i in 3" :key="i" class="mb-md">
        <el-card shadow="hover" class="article-card">
          <div class="article-cover">
            <el-image src="https://via.placeholder.com/800x450" fit="cover" alt="文章封面" />
          </div>
          <div class="article-meta">
            <el-tag size="small" type="info">技术</el-tag>
            <span class="date">{{ new Date().toLocaleDateString() }}</span>
          </div>
          <h4 class="article-title">示例文章标题 {{ i }}</h4>
          <p class="article-excerpt text-ellipsis-3">
            这是一篇示例文章的摘要内容，展示了文章的主要内容和观点。这是一篇示例文章的摘要内容，展示了文章的主要内容和观点。
          </p>
          <div class="article-footer">
            <el-button text>阅读更多</el-button>
            <div class="stats">
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  padding: $spacing-base 0;
}

.welcome-card {
  margin-bottom: $spacing-large;
  text-align: center;

  .card-header {
    h2 {
      font-size: $font-size-extra-large;
      margin: 0;
    }
  }

  .card-content {
    p {
      color: $text-regular;
      margin-bottom: $spacing-base;
    }
  }

  .actions {
    margin-top: $spacing-large;
  }
}

.section-title {
  border-left: 4px solid $primary-color;
  font-size: $font-size-large;
  margin-bottom: $spacing-base;
  padding-left: $spacing-base;
}

.article-card {
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .article-cover {
    border-radius: $border-radius-base;
    margin-bottom: $spacing-small;
    overflow: hidden;

    .el-image {
      height: 180px;
      width: 100%;
    }
  }

  .article-meta {
    @include flex(row, space-between, center);
    color: $text-secondary;
    font-size: $font-size-small;
    margin-bottom: $spacing-small;
  }

  .article-title {
    font-size: $font-size-medium;
    margin-bottom: $spacing-small;
  }

  .article-excerpt {
    color: $text-regular;
    font-size: $font-size-base;
    margin-bottom: $spacing-base;
  }

  .article-footer {
    @include flex(row, space-between, center);
    margin-top: auto;

    .stats {
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

// 响应式调整
@include responsive('xs') {
  .welcome-card {
    .card-header {
      h2 {
        font-size: $font-size-large;
      }
    }
  }
}
</style>
