<script setup lang="ts">
import { computed } from 'vue'
import type { PostProps } from '@/store/post'
import type { ImageProps } from '@/store/utils';
import { generateFitUrl } from '../helper'
import { RouterLink } from 'vue-router';

// 定义 props
const props = defineProps<{list:PostProps[]}>()

// 计算属性：处理文章列表并生成图片 URL
const posts = computed(() => {
  return props.list.map(post => {
    if (post.image) {
      generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
    }
    return post
  })
})
</script>

<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <RouterLink :to="`/posts/${post._id}/`">{{ post.title }}</RouterLink>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <!--类型断言-->
            <img :src="(post.image as ImageProps).fitUrl" :alt="post.title" class="rounded-lg w-100" />
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>