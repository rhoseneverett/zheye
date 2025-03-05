<script setup lang='ts'>
import { ref, useAttrs, watch } from 'vue';
import http from '@/http';


// const props = defineProps({
//   action: {
//     type: String,
//     required: true,
//   }
// })

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean

interface UploadedData {
  data: {
    url: string;
  };
}

const props = defineProps<{ action: string, beforeUpload?: CheckFunction, uploaded?: UploadedData }>()

const emit = defineEmits(['file-uploaded', 'file-uploaded-error'])

const fileInput = ref<null | HTMLInputElement>(null)
const upload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const uploadedData = ref(props.uploaded)

const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')

//如果父组件传递的数据是异步获取的（例如从 API 请求），
//在子组件渲染时，数据可能还没有加载完成，因此 props 是 undefined
//在父组件中确保数据加载完成后再渲染子组件。
//在子组件中使用 watch 或 watchEffect 监听 props 的变化
watch(() => props.uploaded, (newValue) => {
  if (newValue) {
    fileStatus.value = 'success'
    uploadedData.value = newValue
  }
  // console.log(props.uploaded)
})

const fileUpload = async (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  if (currentTarget.files) {
    try {
      const files = Array.from(currentTarget.files)
      if (props.beforeUpload) {
        const result = props.beforeUpload(files[0])
        if (!result) return
      }
      fileStatus.value = 'loading'
      const formData = new FormData()
      formData.append('file', files[0])
      const resp = await http.post(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(resp)
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
    <input type="file" class="file-input d-none" ref="fileInput" @change="fileUpload">
  </div>
</template>