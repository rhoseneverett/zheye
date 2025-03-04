<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { GlobalDataProps, PostProps, ResponseType, ImageProps, RuleProps } from '../store'
import ValidateInput from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '../components/Uploader.vue'
import createMessage from '../components/createMessage'
import { beforeUploadCheck } from '../helper'

const titleVal = ref('')
const router = useRouter()
const store = useStore<GlobalDataProps>()
let imageId = ''
const titleRules: RuleProps[] = [
  { type: 'required', message: '文章标题不能为空' }
]
const contentVal = ref('')
const contentRules: RuleProps[] = [
  { type: 'required', message: '文章详情不能为空' }
]
const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
}
const onFormSubmit = async (result: boolean) => {
  if (result) {
    const { column, _id } = store.state.user
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      await store.dispatch('createPost', newPost)
      createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
      setTimeout(() => {
        router.push({ name: 'column', params: { id: column } })
      }, 2000)
    }
  }
}

const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过 1Mb', 'error')
  }
  return passed
}

const uploadedError = (error:any) => {
  createMessage(`上传图片出现错误 ${error}`,'error')
}
</script>

<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck" @file-uploaded="handleFileUploaded" @file-uploaded-error="uploadedError">
      <h2>点击上传图片</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url">
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input rows="10" type="text" tag="textarea" placeholder="请输入文章详情" :rules="contentRules"
          v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<!--不能添加scoped因为插槽内容不会被css识别-->
<!--或者添加:deep()-->
<style scoped>
.create-post-page :deep(.file-upload-container) {
  height: 200px;
  cursor: pointer;
}

.create-post-page :deep(.file-upload-container img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>