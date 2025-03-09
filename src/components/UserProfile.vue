<script setup lang="ts">
import { computed } from 'vue'
import type { UserDataProps } from '@/store/user'
import { addColumnAvatar } from '../helper'

// 定义 props
const props = defineProps<{user:UserDataProps}>()
// 计算用户头像的 URL
const fitUrl = computed(() => {
  addColumnAvatar(props.user, 50, 50)
  const { avatar } = props.user
  return avatar && avatar.fitUrl
})
</script>

<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{ user.nickName }}</h6>
        <span class="text-truncate text-muted d-block">{{ user.description }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.user-profile-component img {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50px;
}
</style>
