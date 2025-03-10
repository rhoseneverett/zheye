<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import type { RuleProps } from '@/store/utils';
import { eventBus } from '@/mitt';

type TagType = 'input' | 'textarea'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// const props = defineProps < {
//   rules?: RuleProps[],
//   modelValue?: string,
//   tag: TagType
// } > ()

const props = withDefaults(
  defineProps<{
    rules?: RuleProps[];
    modelValue?: string;
    tag?: TagType; // 类型为 TagType
  }>(),
  {
    tag: 'input'     // 默认值为 'input'
  }
)

//v-model组件通信
const emit = defineEmits<{
  (e: 'update:modelValue', targetValue: string): void
}>()

const inputRef = reactive({
  //computed:getter and setter
  val: computed({
    get: () => props.modelValue || '',
    set: val => {
      emit('update:modelValue', val)
    }
  }),
  error: false,
  message: ''
})

const validateInput = () => {
  if (props.rules) {
    const pass = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = inputRef.val.trim() !== ''
          break
        case 'email':
          passed = emailReg.test(inputRef.val)
          break
        case 'password':
          passed = rule.validator ? rule.validator() : true
          break
        default:
          break
      }
      return passed
    })
    inputRef.error = !pass
    return pass
  }
  return true
}

onMounted(() => {
  eventBus.emit('form-item-created', validateInput)
})

// <script setup> 的组件是封闭的，父组件无法直接访问子组件的内部状态或方法。
// 通过 defineExpose，你可以选择性地暴露某些内容
defineExpose({ validateInput })

// 阻止 $attrs 绑定到根元素
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <!--$attrs是一个特殊的属性，用于传递父组件传递给子组件的非 prop 属性 -->
  <div class="validate-input-container pb-3">
    <input v-model="inputRef.val" @blur="validateInput" v-bind="$attrs" class="form-control"
      :class="{ 'is-invalid': inputRef.error }" v-if="tag !== 'textarea'">
    <textarea v-else class="form-control" :class="{ 'is-invalid': inputRef.error }" v-model="inputRef.val"
      @blur="validateInput" v-bind="$attrs">
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>