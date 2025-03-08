<script setup lang="ts">
import useDOMCreate from '../hooks/useDOMCreate';

// 定义 props
const props = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false,
  },
});

// 定义 emits
const emit = defineEmits(['modal-on-close', 'modal-on-confirm']);

// 调用自定义 hook
useDOMCreate('modal');

// 关闭模态框
const onClose = () => {
  emit('modal-on-close');
};

// 确认操作
const onConfirm = () => {
  emit('modal-on-confirm');
};
</script>

<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="onClose">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onClose">取消</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>