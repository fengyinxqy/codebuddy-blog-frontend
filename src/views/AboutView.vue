<script setup lang="ts">
import { ref } from 'vue'

const skills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'CSS/SCSS', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'Git', level: 85 },
])

const socialLinks = ref([
  { name: 'GitHub', icon: 'link', url: 'https://github.com' },
  { name: '掘金', icon: 'link', url: 'https://juejin.cn' },
  { name: '知乎', icon: 'link', url: 'https://www.zhihu.com' },
  { name: '微博', icon: 'link', url: 'https://weibo.com' },
])

const statistics = ref([
  { label: '文章', value: 58, icon: 'Document' },
  { label: '分类', value: 6, icon: 'Files' },
  { label: '标签', value: 24, icon: 'Collection' },
  { label: '评论', value: 132, icon: 'ChatDotRound' },
])
</script>

<template>
  <div class="about-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="profile-header">
          <div class="profile-avatar">
            <el-avatar
              :size="120"
              src="https://via.placeholder.com/120"
              alt="作者头像"
            />
          </div>
          <h1 class="profile-name">博主昵称</h1>
          <p class="profile-bio">前端开发工程师 / 技术博主 / 开源爱好者</p>
          <div class="profile-social">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <el-button
                type="info"
                :icon="link.icon"
                circle
              />
            </a>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-xl"
    >
      <el-col :md="16">
        <el-card
          shadow="hover"
          class="about-card"
        >
          <template #header>
            <div class="card-header">
              <h2>关于我</h2>
            </div>
          </template>
          <div class="about-content">
            <p>你好！我是一名热爱技术的前端开发工程师。</p>
            <p>
              主要从事Web前端开发工作，擅长Vue.js、TypeScript等技术栈。热爱开源，喜欢分享技术经验和心得。
            </p>
            <p>
              这个博客是我用来记录学习笔记、技术分享和生活感悟的地方。希望能通过文字记录成长，也希望这些内容能对你有所帮助。
            </p>

            <h3 class="section-title mt-lg">技能特长</h3>
            <div class="skills-list">
              <div
                v-for="skill in skills"
                :key="skill.name"
                class="skill-item"
              >
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <el-progress
                  :percentage="skill.level"
                  :color="skill.level > 85 ? '#67C23A' : '#409EFF'"
                  :show-text="false"
                  :stroke-width="8"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :md="8">
        <el-card
          shadow="hover"
          class="statistics-card"
        >
          <template #header>
            <div class="card-header">
              <h2>统计数据</h2>
            </div>
          </template>
          <div class="statistics-grid">
            <div
              v-for="stat in statistics"
              :key="stat.label"
              class="stat-item"
            >
              <el-icon :size="24"><component :is="stat.icon" /></el-icon>
              <div class="stat-info">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </el-card>

        <el-card
          shadow="hover"
          class="contact-card mt-lg"
        >
          <template #header>
            <div class="card-header">
              <h2>联系我</h2>
            </div>
          </template>
          <div class="contact-content">
            <p>
              <el-icon><Message /></el-icon> Email: example@example.com
            </p>
            <p>
              <el-icon><Location /></el-icon> 位置: 中国，深圳
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  padding: $spacing-base 0;
}

.profile-header {
  text-align: center;

  .profile-avatar {
    margin-bottom: $spacing-base;
  }

  .profile-name {
    font-size: $font-size-extra-large;
    margin: 0 0 $spacing-small;
  }

  .profile-bio {
    color: $text-regular;
    margin-bottom: $spacing-base;
  }

  .profile-social {
    @include flex(row, center, center);
    gap: $spacing-base;
  }
}

.about-card {
  .about-content {
    p {
      color: $text-regular;
      margin-bottom: $spacing-base;
    }
  }
}

.section-title {
  border-left: 4px solid $primary-color;
  font-size: $font-size-large;
  margin-bottom: $spacing-base;
  padding-left: $spacing-base;
}

.skills-list {
  .skill-item {
    margin-bottom: $spacing-base;

    &:last-child {
      margin-bottom: 0;
    }

    .skill-header {
      @include flex(row, space-between, center);
      margin-bottom: $spacing-small;

      .skill-name {
        color: $text-primary;
        font-weight: 500;
      }

      .skill-level {
        color: $text-secondary;
        font-size: $font-size-small;
      }
    }
  }
}

.statistics-card {
  .statistics-grid {
    display: grid;
    gap: $spacing-base;
    grid-template-columns: repeat(2, 1fr);

    .stat-item {
      @include flex(row, flex-start, center);
      gap: $spacing-base;
      padding: $spacing-base;

      .el-icon {
        color: $primary-color;
      }

      .stat-info {
        .stat-value {
          color: $text-primary;
          font-size: $font-size-large;
          font-weight: bold;
        }

        .stat-label {
          color: $text-secondary;
          font-size: $font-size-small;
        }
      }
    }
  }
}

.contact-card {
  .contact-content {
    p {
      @include flex(row, flex-start, center);
      color: $text-regular;
      gap: $spacing-small;
      margin-bottom: $spacing-base;

      &:last-child {
        margin-bottom: 0;
      }

      .el-icon {
        color: $primary-color;
      }
    }
  }
}

// 响应式调整
@include responsive('md-down') {
  .statistics-card {
    .statistics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include responsive('sm-down') {
  .profile-header {
    .profile-name {
      font-size: $font-size-large;
    }
  }
}
</style>
