<template>
  <el-form
    ref="form"
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
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          :is="`el-${item.type}`"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
        ></component>
        <el-upload
          ref="upload"
          v-if="item.type === 'upload'"
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
        <div id="editor" v-if="item.type === 'editor'"></div>
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
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import E from 'wangeditor'
import { FormOptions } from '../types/types.js'

export default defineComponent({
  name: 'm-form',
})
</script>

<script lang='ts' setup>
import cloneDeep from 'lodash/cloneDeep'
import { defineProps, PropType } from 'vue'
import {
  FormInstance,
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
  httpRequest: {
    type: Function,
  },
})

const model = ref<any>({})
const rules = ref<any>({})
const form = ref<FormInstance | null>()
const edit = ref()
const upload = ref()

const initForm = () => {
  let m: any = {}
  let r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
    if (item.type === 'editor') {
      // 初始化富文本编辑器
      nextTick(() => {
        const editorEl = document.getElementById('editor')
        if (editorEl) {
          const editor = new E('#editor')
          editor.config.placeholder = item.placeholder!
          editor.create()
          // 初始化富文本内容
          editor.txt.html(item.value)
          editor.config.onchange = (newHtml: string) => {
            model.value[item.prop!] = newHtml
          }
          edit.value = editor
        }
      })
    }
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

// 自定义表单重置方法
const resetFields = () => {
  form.value?.resetFields()
  // 重置富文本编辑器的内容
  const editorItem = props.options.find((item) => item.type === 'editor')
  if (editorItem) {
    edit.value.txt.html(editorItem.value)
  }
  // 重置上传组件的内容
  const uploadItem = props.options.find((item) => item.type === 'upload')
  if (uploadItem) {
    upload.value[0].clearFiles()
  }
}

// 分发方法
defineExpose({
  resetFields,
})

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
])

const onSuccess = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(response, uploadFile, uploadFiles)
  const uploadItem = props.options.find((item) => item.type === 'upload')
  model.value[uploadItem?.prop!] = {
    response,
    uploadFile,
    uploadFiles,
  }
  emits('on-success', {
    response,
    uploadFile,
    uploadFiles,
  })
}

const onPreview = (uploadFile: UploadFile) => {
  emits('on-preview', uploadFile)
}

const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('on-remove', { uploadFile, uploadFiles })
}

const onError = (
  error: Error,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  emits('on-eroor', { error, uploadFile, uploadFiles })
}

const onProgress = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  emits('on-progress', { evt, uploadFile, uploadFiles })
}

const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile)
  emits('on-change', { uploadFile, uploadFiles })
}

const onExceed = (files: File[], uploadFiles: UploadFiles) => {
  emits('on-exceed', { files, uploadFiles })
}

const beforeUpload = (rawFile: UploadRawFile) => {
  emits('before-upload', rawFile)
}

const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits('before-Remove', { uploadFile, uploadFiles })
}
</script>
<style  lang='scss' scoped>
</style>