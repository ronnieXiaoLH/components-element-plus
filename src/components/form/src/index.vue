<template>
  <el-form
    :validate-on-rule-change="validateOnRuleChange"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
  >
    <template v-for="(item, index) in options" :key="item.prop + index">
      <el-form-item
        v-if="!item.children?.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload'"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        ></component>
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-eroor="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :before-Remove="beforeRemove"
          :http-request="httpRequest"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
      </el-form-item>
    </template>
    <template v-for="(item, index) in options" :key="item.prop + index">
      <el-form-item
        v-if="item.children?.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        >
          <template v-for="(child, i) in item.children" :key="child.value + i">
            <component
              :is="`el-${child.type}`"
              :value="child.value"
              :label="child.label"
            >
            </component>
          </template>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { FormOptions } from '../types/types.js'

export default defineComponent({
  name: 'm-form',
})
</script>

<script lang='ts' setup>
import cloneDeep from 'lodash/cloneDeep'
import { defineProps, PropType } from 'vue'
import {
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
} from 'element-plus'
import { Awaitable } from 'element-plus/es/utils'
const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: false,
  },
})

const model = ref<any>({})
const rules = ref<any>({})

const initForm = () => {
  let m: any = {}
  let r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

onMounted(() => {
  initForm()
})

watch(
  () => props.options,
  () => {
    initForm()
  },
  { deep: true }
)

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-eroor',
  'on-progress',
  'on-change',
  'on-exceed',
  'before-upload',
  'before-Remove',
  'http-request',
])

const onSuccess = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(response, uploadFile, uploadFiles)
  emits('on-success')
}

const onPreview = (uploadFile: UploadFile) => {
  emits('on-preview')
}

const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-remove')
}

const onError = (
  error: Error,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  emits('on-eroor')
}

const onProgress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  emits('on-progress')
}

const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile)
  emits('on-change')
}

const onExceed = (files: File[], uploadFiles: UploadFiles) => {
  emits('on-exceed')
}

const beforeUpload = (rawFile: UploadRawFile) => {
  emits('before-upload')
}

const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('before-Remove')
}

const httpRequest = (options: UploadRequestOptions) => {
  emits('before-Remove')
}
</script>
<style  lang='scss' scoped>
</style>