<script setup lang="ts">
import { useRoute } from 'vue-router';
import PostList from '../components/PostList.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { addColumnAvatar } from '../helper'
import { type ColumnProps } from '../store'


const store = useStore()
// 获取当前路由
const route = useRoute();
// 解析路由参数中的 id : 67c5c15ab558154f0393456a
const currentId = route.params.id;
// 根据 id 查找对应的专栏信息
const column = computed(() => {
  const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
  if (selectColumn) {
    addColumnAvatar(selectColumn, 100, 100)
  }
  return selectColumn
})
// 根据 id 过滤对应的文章列表
const list = computed(() => store.getters.getPostsByCid(currentId))

onMounted(() => {
  store.dispatch('fetchColumn', currentId)
  store.dispatch('fetchPosts', currentId)
})
</script>

<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list" />
  </div>
</template>