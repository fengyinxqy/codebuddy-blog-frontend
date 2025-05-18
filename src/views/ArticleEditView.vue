<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import WangEditor from '@/components/common/WangEditor.vue'

const route = useRoute()
const router = useRouter()
const articleId = route.params.id
const isEditMode = !!articleId

// 表单数据
const form = ref({
  title: '',
  category: '',
  tags: [],
  content: '',
  cover: '',
})

// 模拟分类数据
const categories = ref([
  { value: 'tech', label: '技术' },
  { value: 'design', label: '设计' },
  { value: 'life', label: '生活' },
  { value: 'travel', label: '旅行' },
])

// 模拟标签数据
const tags = ref([
  { value: 'vue', label: 'Vue.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'vite', label: 'Vite' },
  { value: 'element-plus', label: 'Element Plus' },
])

// 保存文章
const saveArticle = () => {
  if (!form.value.title.trim()) {
    ElMessage.warning('请输入文章标题')
    return
  }

  if (!form.value.content.trim()) {
    ElMessage.warning('请输入文章内容')
    return
  }

  ElMessage.success(isEditMode ? '文章更新成功' : '文章创建成功')
  router.push('/articles')
}

// 取消编辑
const cancelEdit = () => {
  ElMessageBox.confirm('确定要取消编辑吗？未保存的内容将会丢失', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      router.go(-1)
    })
    .catch(() => {})
}

// 模拟加载文章数据
if (isEditMode) {
  // 实际项目中这里会从API获取文章数据
  form.value = {
    title: '如何使用Vue3和TypeScript构建现代化博客系统',
    category: 'tech',
    tags: ['vue', 'typescript', 'element-plus'],
    content: '<h1>如何使用Vue3和TypeScript构建现代化博客系统</h1><p>这是一篇示例文章...</p>',
    cover: 'https://via.placeholder.com/800x450',
  }
}
</script>

<template>
  <div class="article-edit-view">
    <el-page-header
      :content="isEditMode ? '编辑文章' : '创建文章'"
      @back="cancelEdit"
    />

    <el-form
      :model="form"
      label-width="80px"
      class="mt-lg"
    >
      <el-form-item
        label="文章标题"
        required
      >
        <el-input
          v-model="form.title"
          placeholder="请输入文章标题"
        />
      </el-form-item>

      <el-form-item label="文章封面">
        <el-upload
          class="cover-uploader"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="(file) => (form.cover = URL.createObjectURL(file.raw))"
        >
          <img
            v-if="form.cover"
            :src="form.cover"
            class="cover-image"
            alt="文章封面"
          />
          <el-icon
            v-else
            class="cover-uploader-icon"
            ><Plus
          /></el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="文章分类"
        required
      >
        <el-select
          v-model="form.category"
          placeholder="请选择分类"
        >
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="文章标签">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入标签"
        >
          <el-option
            v-for="item in tags"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="文章内容"
        required
      >
        <WangEditor
          v-model="form.content"
          height="500px"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="saveArticle"
        >
          {{ isEditMode ? '更新文章' : '发布文章' }}
        </el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.article-edit-view {
  padding: $spacing-base 0;
}

.cover-uploader {
  border: 1px dashed $border-color-base;
  border-radius: $border-radius-base;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 180px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: $primary-color;
  }

  .cover-uploader-icon {
    color: $text-secondary;
    font-size: $font-size-extra-large;
    width: 100%;
    height: 100%;
    @include flex(row, center, center);
  }

  .cover-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
