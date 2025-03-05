<script setup lang="ts">
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import Uploader from '@/components/Uploader.vue';
import createMessage from '@/components/createMessage';
import type { ResponseType, ImageProps } from '@/store';

const store = useStore()
const list = computed(() => store.state.columns)


onMounted(() => {
  store.dispatch('fetchColumns')
})

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    createMessage('上传图片只能是 JPG 格式!', 'error')
  }
  return isJPG
}

const uploaded = (rawData:ResponseType<ImageProps>) => {
  createMessage(`上传图片ID ${rawData.data._id}`,'success')
}

const uploadedError = (error:any) => {
  createMessage(`上传图片出现错误 ${error}`,'error')
}


</script>

<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <!-- <a href="#" class="btn btn-primary my-2">开始写文章</a> -->
            <RouterLink to="/create" class="btn btn-primary my-2">开始写文章</RouterLink>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list" />
    <!-- <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
       @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button> -->
  </div>
</template>