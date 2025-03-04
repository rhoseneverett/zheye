<script setup lang="ts">
import { ref } from 'vue';
import type { RuleProps } from '@/store';
import ValidateForm from '../components/ValidateForm.vue';
import ValidateInput from '../components/ValidateInput.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import createMessage from '@/components/createMessage';

const store = useStore()

const passwordVal = ref('')
const passwordRules: RuleProps[] = [
  { type: 'required', message: '密码不能为空' },
  { type: 'password', message: '请输入数字和字母组合的8-16位密码' }
]

const emailVal = ref('')
const emailRules: RuleProps[] = [
  { type: 'required', message: '电子邮箱不能为空' },
  { type: 'email', message: '邮箱格式不符合要求' }
]

const inputRef = ref<any>(null)

const submit = async (result: boolean) => {
  console.log(result)
  if (result) {
    const payload = {
      email: emailVal.value,
      password: passwordVal.value
    }
    await store.dispatch('loginAndFetch', payload)
    createMessage('登录成功 1秒后跳转首页', 'success',1000)
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}

const router = useRouter()

</script>

<template>
  <ValidateForm class="validate-form-container" @form-submit="submit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <ValidateInput :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" ref="inputRef" />
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <ValidateInput type="password" :rules="passwordRules" v-model="passwordVal" placeholder="请输入密码" />
    </div>
    <template v-slot:submit>
      <span class="btn btn-primary">提交</span>
    </template>
  </ValidateForm>
</template>