<template>
  <div>
    <m-form :options="options" label-width="100px">
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </m-form>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { FormOptions } from '../../components/form/types/types.js'

const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
      {
        min: 6,
        max: 8,
        message: '用户名在6-8位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
      {
        min: 6,
        max: 15,
        message: '用户名在6-15位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      'show-password': true,
      clearable: true,
    },
  },
  {
    type: 'select',
    value: '',
    label: '职位',
    placeholder: '请选择职位',
    prop: 'role',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blur',
      },
    ],
    attrs: {
      style: {
        width: '100%',
      },
    },
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1',
      },
      {
        type: 'option',
        label: '主管',
        value: '2',
      },
      {
        type: 'option',
        label: '员工',
        value: '3',
      },
    ],
  },
  {
    type: 'checkbox-group',
    value: [],
    label: '爱好',
    prop: 'like',
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1',
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2',
      },
      {
        type: 'checkbox',
        label: '斯诺克',
        value: '3',
      },
    ],
  },
  {
    type: 'radio-group',
    value: '',
    label: '性别',
    prop: 'gender',
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male',
      },
      {
        type: 'radio',
        label: '女',
        value: 'female',
      },
      {
        type: 'radio',
        label: '保密',
        value: 'unknow',
      },
    ],
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'picture',
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'blur',
      },
    ],
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
    },
  },
]
</script>
<style  lang='scss' scoped>
::v-deep .el-upload {
  display: block;
}
</style>