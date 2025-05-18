<script setup lang="ts">
import { ref } from 'vue'

// 模拟分类数据
const categories = ref([
  {
    id: 1,
    name: '技术',
    description: '关于编程、开发和技术相关的文章',
    count: 25,
    icon: 'Monitor',
    color: '#409EFF',
    subcategories: [
      { id: 101, name: '前端开发', count: 12 },
      { id: 102, name: '后端开发', count: 8 },
      { id: 103, name: '移动开发', count: 5 },
    ],
  },
  {
    id: 2,
    name: '设计',
    description: '关于UI/UX设计、平面设计和创意灵感的文章',
    count: 18,
    icon: 'Brush',
    color: '#67C23A',
    subcategories: [
      { id: 201, name: 'UI设计', count: 7 },
      { id: 202, name: 'UX设计', count: 6 },
      { id: 203, name: '平面设计', count: 5 },
    ],
  },
  {
    id: 3,
    name: '生活',
    description: '关于日常生活、心情随笔和个人成长的文章',
    count: 12,
    icon: 'Coffee',
    color: '#E6A23C',
    subcategories: [
      { id: 301, name: '生活随笔', count: 5 },
      { id: 302, name: '心情日记', count: 4 },
      { id: 303, name: '个人成长', count: 3 },
    ],
  },
  {
    id: 4,
    name: '旅行',
    description: '关于旅行见闻、风景照片和旅行攻略的文章',
    count: 8,
    icon: 'Place',
    color: '#F56C6C',
    subcategories: [
      { id: 401, name: '国内旅行', count: 4 },
      { id: 402, name: '国外旅行', count: 2 },
      { id: 403, name: '旅行攻略', count: 2 },
    ],
  },
  {
    id: 5,
    name: '阅读',
    description: '关于书籍推荐、读书笔记和文学赏析的文章',
    count: 15,
    icon: 'Reading',
    color: '#909399',
    subcategories: [
      { id: 501, name: '书籍推荐', count: 6 },
      { id: 502, name: '读书笔记', count: 5 },
      { id: 503, name: '文学赏析', count: 4 },
    ],
  },
  {
    id: 6,
    name: '影视',
    description: '关于电影、电视剧和动漫的评论和推荐',
    count: 10,
    icon: 'Film',
    color: '#9254DE',
    subcategories: [
      { id: 601, name: '电影', count: 4 },
      { id: 602, name: '电视剧', count: 3 },
      { id: 603, name: '动漫', count: 3 },
    ],
  },
])
</script>

<template>
  <div class="categories-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="page-header">
          <h1 class="page-title">文章分类</h1>
          <p class="page-description">浏览不同类别的文章，发现你感兴趣的内容</p>
        </div>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-lg"
    >
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        v-for="category in categories"
        :key="category.id"
        class="mb-md"
      >
        <el-card
          class="category-card"
          shadow="hover"
          :body-style="{ borderTop: `3px solid ${category.color}` }"
        >
          <div class="category-header">
            <el-icon
              :size="24"
              :color="category.color"
            >
              <component :is="category.icon" />
            </el-icon>
            <h3 class="category-name">{{ category.name }}</h3>
            <el-tag
              size="small"
              type="info"
              round
              >{{ category.count }} 篇</el-tag
            >
          </div>

          <p class="category-description">{{ category.description }}</p>

          <div class="subcategories">
            <router-link
              v-for="subcategory in category.subcategories"
              :key="subcategory.id"
              :to="`/categories/${category.id}/subcategory/${subcategory.id}`"
              class="subcategory-item"
            >
              <span class="subcategory-name">{{ subcategory.name }}</span>
              <span class="subcategory-count">{{ subcategory.count }}</span>
            </router-link>
          </div>

          <div class="category-footer">
            <router-link :to="`/categories/${category.id}`">
              <el-button
                type="primary"
                text
                >查看全部文章</el-button
              >
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-xl"
    >
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <h2>分类统计</h2>
            </div>
          </template>
          <div class="chart-container">
            <div class="chart-placeholder">
              <p>这里将展示分类统计图表</p>
              <p class="text-secondary">实际项目中可以使用ECharts等图表库</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.categories-view {
  padding: $spacing-base 0;
}

.page-header {
  border-bottom: 1px solid $border-color-light;
  margin-bottom: $spacing-large;
  padding-bottom: $spacing-base;
  text-align: center;

  .page-title {
    font-size: $font-size-extra-large;
    margin: 0 0 $spacing-small;
  }

  .page-description {
    color: $text-secondary;
    margin: 0;
  }
}

.category-card {
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .category-header {
    @include flex(row, flex-start, center);
    gap: $spacing-small;
    margin-bottom: $spacing-base;

    .category-name {
      flex-grow: 1;
      font-size: $font-size-medium;
      margin: 0;
    }
  }

  .category-description {
    color: $text-regular;
    margin-bottom: $spacing-base;
    min-height: 3em;
  }

  .subcategories {
    margin-bottom: $spacing-base;

    .subcategory-item {
      @include flex(row, space-between, center);
      border-bottom: 1px dashed $border-color-lighter;
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

      .subcategory-count {
        color: $text-secondary;
        font-size: $font-size-small;
      }
    }
  }

  .category-footer {
    text-align: right;
  }
}

.chart-container {
  height: 300px;

  .chart-placeholder {
    @include flex(column, center, center);
    background-color: $background-color-light;
    border-radius: $border-radius-base;
    height: 100%;
    text-align: center;

    p {
      margin: $spacing-small 0;
    }

    .text-secondary {
      color: $text-secondary;
      font-size: $font-size-small;
    }
  }
}
</style>
