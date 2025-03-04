<script setup lang="ts">
import useDOMCreate from '@/hooks/useDOMCreate';

defineProps<{
  text: string; // 正确
  background: string;
}>();

useDOMCreate('back')
</script>

<template>
  <!-- <teleport to="#back"> -->
  <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    :style="{ backgroundColor: background || '' }">
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || 'loading' }}</span>
      </div>
      <p v-if="text" class="text-primary small">{{ text }}</p>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<style>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}

.loading-container {
  text-align: center;
}
</style>
