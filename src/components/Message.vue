<script setup lang="ts">
import { ref, computed } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'

type MessageType = 'success' | 'error' | 'default'

const props = defineProps<{
  message: string
  type?: MessageType
}>()

useDOMCreate('message')

const isVisible = ref(true)

const classObject = computed(() => ({
  'alert-success': props.type === 'success',
  'alert-danger': props.type === 'error',
  'alert-primary': props.type === 'default'
}))

const hide = () => {
  isVisible.value = false
}
</script>


<template>
  <teleport to="#message">
    <!-- :class赋值给对象会自动判断 true会加上-->
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject" v-if="isVisible">
      <span>{{message}}</span>
      <button type="button" class="btn-close" aria-label="Close" @click="hide"></button>
    </div>
  </teleport>
</template>

