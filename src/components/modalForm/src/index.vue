<template>
  <el-dialog
    :custom-class="isScroll ? 'm-dialog-form' : ''"
    v-model="dialogVisible"
    v-bind="$attrs"
  >
    <template #default>
      <m-form
        ref="form"
        :options="options"
        label-width="100px"
        @on-preview="onPreview"
        @on-remove="onRemove"
        @on-success="onSuccess"
        @on-eroor="onError"
        @on-progress="onProgress"
        @on-change="onChange"
        @on-exceed="onExceed"
        @before-upload="beforeUpload"
        @before-Remove="beforeRemove"
        :http-request="httpRequest"
      >
        <template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </m-form>
    </template>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { FormInstance } from 'element-plus'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'm-modal-form',
})
</script>

<script lang='ts' setup>
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  // 只在屏幕内滚动
  isScroll: {
    type: Boolean,
    default: false,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
  onError: {
    type: Function,
  },
  onProgress: {
    type: Function,
  },
  onChange: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  httpRequest: {
    type: Function,
  },
})

const dialogVisible = ref(props.visible)

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)

const emits = defineEmits(['update:visible'])

watch(
  () => dialogVisible.value,
  (val) => {
    emits('update:visible', val)
  }
)

const form = ref<FormInstance | null>()
</script>
<style  lang='scss'>
.m-dialog-form {
  height: 70vh;
  overflow: auto;
}
</style>