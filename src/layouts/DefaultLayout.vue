<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="default-layout">
    <el-container>
      <el-header height="60px">
        <div class="header-content container">
          <div class="logo">
            <router-link to="/">Blog</router-link>
          </div>
          <el-menu
            :default-active="$route.path"
            mode="horizontal"
            :ellipsis="false"
            router
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/articles">文章</el-menu-item>
            <el-menu-item index="/categories">分类</el-menu-item>
            <el-menu-item index="/tags">标签</el-menu-item>
            <el-menu-item index="/about">关于</el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <el-main>
        <div class="container">
          <RouterView />
        </div>
      </el-main>

      <el-footer height="60px">
        <div class="footer-content container">
          <p>&copy; {{ new Date().getFullYear() }} Blog. All rights reserved.</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
}

.el-container {
  min-height: 100vh;
}

.el-header {
  background-color: $background-color-white;
  border-bottom: 1px solid $border-color-light;
  padding: 0;

  .header-content {
    @include flex(row, space-between, center);
    height: 100%;
  }

  .logo {
    font-size: $font-size-large;
    font-weight: bold;

    a {
      color: $primary-color;
      text-decoration: none;
    }
  }

  .el-menu {
    border-bottom: none;
  }
}

.el-main {
  background-color: $background-color-base;
  padding-bottom: $spacing-extra-large;
  padding-top: $spacing-extra-large;
}

.el-footer {
  background-color: $background-color-white;
  border-top: 1px solid $border-color-light;
  color: $text-secondary;
  padding: 0;

  .footer-content {
    @include flex(row, center, center);
    height: 100%;
  }
}
</style>
