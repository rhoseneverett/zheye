<script setup lang="ts">
import type { UserProps } from '@/store';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import createMessage from './createMessage';
defineProps<{
  user: UserProps
}>()

const router = useRouter()
const store = useStore()

const logout = () => {
  store.commit('logout')
  createMessage('退出登录成功', 'success',1000)
  setTimeout(() => {
    router.push('/')
  }, 2000)
};
</script>

<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <RouterLink to="/" class="navbar-brand">者也专栏</RouterLink>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <RouterLink to="/login" class="btn btn-outline-light my-2">登陆</RouterLink>
      </li>
      <li class="list-inline-item">
        <RouterLink to="/signup" class="btn btn-outline-light my-2">注册</RouterLink>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <Dropdown :title="`你好,${user.nickName}`">
        <DropdownItem>
          <RouterLink to="/create" class="dropdown-item">新建文章</RouterLink>
        </DropdownItem>
        <DropdownItem><a href="" class="dropdown-item">编辑资料</a></DropdownItem>
        <DropdownItem>
          <RouterLink :to="`/column/${user.column}`" class="dropdown-item">我的专栏</RouterLink>
        </DropdownItem>
        <DropdownItem><a href="#" class="dropdown-item" @click.prevent="logout">退出登陆</a></DropdownItem>
      </Dropdown>
    </ul>
  </nav>
</template>
