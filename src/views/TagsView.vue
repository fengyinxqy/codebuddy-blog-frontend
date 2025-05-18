<script setup lang="ts">
import { ref, computed } from 'vue'

// 模拟标签数据
const tags = ref([
  { id: 1, name: 'Vue.js', count: 42, color: '#42b883' },
  { id: 2, name: 'TypeScript', count: 35, color: '#3178c6' },
  { id: 3, name: 'JavaScript', count: 58, color: '#f7df1e' },
  { id: 4, name: 'CSS', count: 45, color: '#264de4' },
  { id: 5, name: 'HTML', count: 38, color: '#e34f26' },
  { id: 6, name: 'React', count: 28, color: '#61dafb' },
  { id: 7, name: 'Node.js', count: 32, color: '#339933' },
  { id: 8, name: 'Python', count: 25, color: '#3776ab' },
  { id: 9, name: 'Docker', count: 18, color: '#2496ed' },
  { id: 10, name: 'Git', count: 22, color: '#f05032' },
  { id: 11, name: 'Webpack', count: 15, color: '#8dd6f9' },
  { id: 12, name: 'Vite', count: 20, color: '#646cff' },
  { id: 13, name: 'Element Plus', count: 30, color: '#409eff' },
  { id: 14, name: 'Sass', count: 28, color: '#cc6699' },
  { id: 15, name: 'MongoDB', count: 12, color: '#47a248' },
  { id: 16, name: 'Redis', count: 8, color: '#dc382d' },
  { id: 17, name: 'MySQL', count: 15, color: '#4479a1' },
  { id: 18, name: 'Linux', count: 20, color: '#fcc624' },
  { id: 19, name: 'Nginx', count: 10, color: '#009639' },
  { id: 20, name: 'AWS', count: 8, color: '#ff9900' },
])

// 按文章数量排序标签
const sortedTags = computed(() => {
  return [...tags.value].sort((a, b) => b.count - a.count)
})

// 计算标签大小
const getTagSize = (count: number) => {
  const max = Math.max(...tags.value.map((t) => t.count))
  const min = Math.min(...tags.value.map((t) => t.count))
  const range = max - min
  const normalized = (count - min) / range
  return 1 + normalized * 1.5 // 1-2.5倍大小范围
}
</script>

<template>
  <div class="tags-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="page-header">
          <h1 class="page-title">标签云</h1>
          <p class="page-description">通过标签快速找到相关文章</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card
          class="tag-cloud-card"
          shadow="hover"
        >
          <div class="tag-cloud">
            <router-link
              v-for="tag in sortedTags"
              :key="tag.id"
              :to="`/tags/${tag.id}`"
              class="tag-item"
              :style="{
                fontSize: `${getTagSize(tag.count)}em`,
                '--tag-color': tag.color,
              }"
            >
              {{ tag.name }}
              <span class="tag-count">{{ tag.count }}</span>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-xl"
    >
      <el-col :md="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>热门标签</h3>
            </div>
          </template>
          <div class="popular-tags">
            <div
              v-for="tag in sortedTags.slice(0, 10)"
              :key="tag.id"
              class="popular-tag-item"
            >
              <router-link
                :to="`/tags/${tag.id}`"
                class="tag-link"
              >
                <div class="tag-info">
                  <span
                    class="tag-name"
                    :style="{ color: tag.color }"
                    >{{ tag.name }}</span
                  >
                  <el-progress
                    :percentage="(tag.count / Math.max(...tags.map((t) => t.count))) * 100"
                    :color="tag.color"
                    :show-text="false"
                    :stroke-width="8"
                  />
                </div>
                <span class="tag-count">{{ tag.count }} 篇</span>
              </router-link>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :md="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <h3>最近使用</h3>
            </div>
          </template>
          <div class="recent-tags">
            <el-timeline>
              <el-timeline-item
                v-for="tag in sortedTags.slice(0, 5)"
                :key="tag.id"
                :color="tag.color"
                :timestamp="'2024-01-01'"
                placement="top"
              >
                <router-link
                  :to="`/tags/${tag.id}`"
                  class="recent-tag-link"
                >
                  <h4>{{ tag.name }}</h4>
                  <p>最近添加了 3 篇文章</p>
                </router-link>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.tags-view {
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

.tag-cloud-card {
  min-height: 300px;
}

.tag-cloud {
  @include flex(row, center, center);
  flex-wrap: wrap;
  gap: $spacing-base;
  padding: $spacing-large;

  .tag-item {
    --tag-color: #{$primary-color};
    color: var(--tag-color);
    cursor: pointer;
    display: inline-block;
    opacity: 0.8;
    padding: $spacing-small;
    text-decoration: none;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .tag-count {
      color: $text-secondary;
      font-size: 0.8em;
      margin-left: 4px;
      opacity: 0.8;
    }
  }
}

.popular-tags {
  .popular-tag-item {
    margin-bottom: $spacing-small;

    &:last-child {
      margin-bottom: 0;
    }

    .tag-link {
      @include flex(row, space-between, center);
      color: $text-primary;
      padding: $spacing-small;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: $background-color-light;
      }
    }

    .tag-info {
      flex-grow: 1;
      margin-right: $spacing-base;
      width: 70%;

      .tag-name {
        display: block;
        font-weight: 500;
        margin-bottom: $spacing-small;
      }
    }

    .tag-count {
      color: $text-secondary;
      font-size: $font-size-small;
    }
  }
}

.recent-tags {
  .recent-tag-link {
    color: $text-primary;
    text-decoration: none;

    h4 {
      font-size: $font-size-medium;
      margin: 0 0 $spacing-small;
    }

    p {
      color: $text-secondary;
      font-size: $font-size-small;
      margin: 0;
    }
  }
}

// 响应式调整
@include responsive('sm-down') {
  .tag-cloud {
    padding: $spacing-base;
  }
}
</style>
