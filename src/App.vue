<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue';
import { computed, watch } from 'vue';
import Loader from './components/Loader.vue';
import createMessage from './components/createMessage'
import { useGlobalStore } from './store/global';
import { useUserStore } from './store/user';

const globalStore = useGlobalStore()
const userStore = useUserStore()

const isLoading = computed(() => globalStore.loading)
const currentUser = computed(() => userStore.data)
const isLogin = computed(() => userStore.isLogin)
const error = computed(() => globalStore.error)

watch(() => error.value.status, () => {
  const { status, message } = error.value
  if (status && message) {
    createMessage(message, 'error')
  }
})

</script>

<template>
  <div class="container">
    <GlobalHeader :data="currentUser" :is-login="isLogin" />
    <Loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0, 0.8)" />
    <RouterView />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
