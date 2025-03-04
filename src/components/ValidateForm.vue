<script setup lang='ts'>
import { eventBus } from '@/mitt';
import { onUnmounted } from 'vue';

const emit = defineEmits<{
  (e: 'form-submit', result: boolean): void
}>()

const submitForm = () => {
  const result = funcArr.map(func => func()).every(result => result)
  emit('form-submit',result)
}

//EventBus
type ValidateFunc = () => boolean
let funcArr: ValidateFunc[] = []

const callback = (func?: ValidateFunc) => {
  if (func) {
    funcArr.push(func)
  }
}

eventBus.on('form-item-created', callback)
onUnmounted(() => {
  eventBus.off('form-item-created', callback)
  funcArr = []
})

</script>

<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
