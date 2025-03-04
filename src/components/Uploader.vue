<script setup lang='ts'>
import { ref, useAttrs } from 'vue';
import http from '@/http';


// const props = defineProps({
//   action: {
//     type: String,
//     required: true,
//   }
// })

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file:File) => boolean

const props = defineProps<{ action: string, beforeUpload?: CheckFunction }>()

const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])

const fileInput = ref<null | HTMLInputElement>(null)
const upload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const uploadedData = ref()

const fileStatus = ref<UploadStatus>('ready')

const fileUpload = async (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  if (currentTarget.files) {
    try {
      const files = Array.from(currentTarget.files)
      if(props.beforeUpload){
        const result = props.beforeUpload(files[0])
        if(!result) return
      }
      fileStatus.value = 'loading'
      const formData = new FormData()
      formData.append('file', files[0]) 
      const resp = await http.post(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      uploadedData.value = resp.data
      emit('file-uploaded', resp.data)
      fileStatus.value = 'success'
    } catch (error) {
      emit('file-uploaded-error', error)
      fileStatus.value = 'error'
    } finally {
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }
  }
}

// 阻止 $attrs 绑定到根元素
defineOptions({
  inheritAttrs: false, 
});

</script>

<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="upload" v-bind="$attrs">
      <!--初始为默认插槽 文件上传时变更为具名插槽-->
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="fileUpload"
    >
  </div>
</template>