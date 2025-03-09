<script setup lang="ts">
import { ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';

defineProps<{
  title: string
}>()

const isOpen = ref(false)

const open = () => {
  isOpen.value = !isOpen.value
}

const myElement = ref<null | HTMLElement>(null)

const outside = useClickOutside(myElement)

watch(outside, () => {
  if (isOpen.value && outside.value) {
    isOpen.value = false
  }
})

</script>


<template>
  <div class="dropdown" ref="myElement">
    <a @click.prevent="open" class="btn btn-outline-light my-2">{{ title }}</a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen" @click="open">
      <slot></slot>
    </ul>
  </div>
</template>
