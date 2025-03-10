<script setup lang="ts">
import { useRoute } from 'vue-router';
import PostList from '../components/PostList.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { addColumnAvatar } from '../helper'
import { type ColumnProps } from '@/store/column'
import { useColumnStore } from '@/store/column';
import { usePostStore } from '@/store/post';
import useLoadMore from '@/hooks/useLoadMore';

const columnStore = useColumnStore()
const postStore = usePostStore()
// 获取当前路由
const route = useRoute();
// 解析路由参数中的 id : 67c5c15ab558154f0393456a
const currentId = ref(route.params.id as string)
// 根据 id 查找对应的专栏信息
const column = computed(() => {
  const selectColumn = columnStore.getColumnById(currentId.value) as ColumnProps | undefined
  if (selectColumn) {
    addColumnAvatar(selectColumn, 100, 100)
  }
  return selectColumn
})
// 根据 id 过滤对应的文章列表
const list = computed(() => postStore.getPostsByCid(currentId.value))

onMounted(() => {
  columnStore.fetchColumn(currentId.value)
  postStore.fetchPosts({ cid: currentId.value })
})

watch(() => route.params, (params) => {
  // 检测路由params,如果变更重新发送请求
  const jumpId = params && params.id as string
  columnStore.fetchColumn(jumpId)
  postStore.fetchPosts({ cid: jumpId })
  currentId.value = params.id as string
})

const total = computed(() => postStore.total)
const currentPage = computed(() => postStore.currentPage)
const {loadMorePage, isLastPage} = useLoadMore(postStore,'fetchPosts',{currentPage,total,cid: currentId.value})
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
    <PostList :list="list"/>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
       @click="loadMorePage" v-if="!isLastPage">
      加载更多
    </button>
  </div>
</template>