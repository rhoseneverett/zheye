<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue';
import { useStore } from 'vuex';
import { computed, onMounted, watch } from 'vue';
import Loader from './components/Loader.vue';
import { type GlobalDataProps } from './store'
import createMessage from './components/createMessage'

const isLoading = computed(() => store.state.loading)
const store = useStore<GlobalDataProps>()
const currentUser = computed(() => store.state.user)
const token = computed(() => store.state.token)
const error = computed(() => store.state.error)

// onMounted(() => {
//   if (!currentUser.value.isLogin && token.value) {
//     // http.defaults.headers.common.Authorization = `Bearer ${token.value}`
//     store.dispatch('fetchCurrentUser')
//   }
// })

watch(() => error.value.status, () => {
  const { status, message } = error.value
  if (status && message) {
    createMessage(message, 'error')
  }
})

</script>

<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
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

<style scoped></style>
