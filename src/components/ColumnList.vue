<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { ColumnProps } from '../store'
import { addColumnAvatar } from '../helper'
import { RouterLink } from 'vue-router'

// 定义 props
const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true
  }
})

// 计算属性：处理专栏列表并添加头像
const columnList = computed(() => {
  return props.list.map(column => {
    addColumnAvatar(column, 50, 50)
    return column
  })
})
</script>

<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.fitUrl"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <RouterLink :to="`/column/${column._id}`" class="btn btn-outline-primary">
            进入专栏
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>