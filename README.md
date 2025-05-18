# Blog Frontend Project

## 项目概述

这是一个基于Vue3的现代化博客前端项目，使用TypeScript和Vite构建，旨在提供优秀的阅读和写作体验。

## 技术栈

- **框架**: Vue 3 + Composition API
- **语言**: TypeScript
- **构建工具**: Vite
- **包管理器**: Bun
- **UI框架**: Element Plus
- **富文本编辑器**: WangEditor

## 核心功能

1. **内容系统**
   - 富文本编辑器(WangEditor)
   - 文章分类/标签管理
   - Markdown兼容模式
2. **互动系统**
   - 评论/回复功能
   - 文章点赞/收藏
   - 用户订阅(邮件通知)
3. **个人IP强化**
   - 作者介绍页
   - 文章系列专题
   - 成就系统徽章

## 项目结构

```
blog-frontend/
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── views/         # 页面视图
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── public/            # 公共资源
└── vite.config.ts     # Vite配置
```

## 开发指南

1. 安装依赖

```bash
bun install
```

2. 启动开发服务器

```bash
bun run dev
```

3. 构建生产版本

```bash
bun run build
```

## 贡献指南

欢迎提交Pull Request，请确保代码风格一致并通过ESLint检查。
