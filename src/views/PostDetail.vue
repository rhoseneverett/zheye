<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import type { GlobalDataProps, PostProps, ImageProps, UserProps } from '../store'
import UserProfile from '../components/UserProfile.vue'
import Modal from '@/components/Modal.vue'
import createMessage from '@/components/createMessage'

// 获取 store 和 route
const store = useStore<GlobalDataProps>()
const route = useRoute()
const currentId = route.params.id

// 初始化 Markdown 解析器
const md = new MarkdownIt()

// 在组件挂载时获取文章数据
onMounted(() => {
  store.dispatch('fetchPost', currentId)
})

// 计算当前文章
const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))

// 计算当前文章的 HTML 内容
const currentHTML = computed(() => {
  if (currentPost.value && currentPost.value.content) {
    return md.render(currentPost.value.content)
  }
  return ''
})

// 计算当前文章的图片 URL
const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
  }
  return null
})

const showEdit = computed(() => {
  const { isLogin, _id } = store.state.user
  if (currentPost.value && currentPost.value.author && isLogin) {
    const postAuthor = currentPost.value.author as UserProps
    return postAuthor._id === _id
  } else {
    return false
  }
})

const modalIsVisible = ref(false)

const router = useRouter()
const deletePost = async() => {
  modalIsVisible.value = false
  const rawData = await store.dispatch('deletePost', currentId)
  createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
  setTimeout(() => {
    router.push({ name: 'column', params: { id: rawData.data.column } })
  }, 2000)

}
</script>

<template>
  <div class="post-detail-page">
    <Modal title="删除文章" :visible="modalIsVisible" @modal-on-close="modalIsVisible = false" @modal-on-confirm="deletePost">
      <p>确定要删除这篇文章吗？</p>
    </Modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEdit" class="btn-group mt-5">
        <RouterLink type="button" class="btn btn-success" :to="{ name: 'create', query: { id: currentPost._id } }">
          编辑
        </RouterLink>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>