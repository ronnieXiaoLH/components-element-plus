<template>
  <div>
    <el-button @click="open">打开</el-button>
    <m-modal-form
      v-model:visible="visible"
      :title="'编辑'"
      width="50%"
      :options="options"
      isScroll
      :on-change="onChange"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #footer="{ form }">
        <el-button @click="cancel(form)">取消</el-button>
        <el-button type="primary" @click="submit(form)">提交</el-button>
      </template>
    </m-modal-form>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { FormOptions } from '../../components/form/types/types'

const visible = ref<boolean>(false)

const open = () => {
  visible.value = true
}

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
        trigger: 'change',
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
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change',
      },
    ],
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
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change',
      },
    ],
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
    // rules: [
    //   {
    //     required: true,
    //     message: '图片不能为空',
    //     trigger: 'blur',
    //   },
    // ],
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
    },
  },
  {
    type: 'editor',
    value: '',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'blur',
      },
    ],
  },
]

const cancel = (form: any) => {
  form.resetFields()
  visible.value = false
}

const submit = (form: any) => {
  const validate = form.validate()
  const model = form.getFormData()
  validate((valid: boolean) => {
    console.log(model)
    if (valid) {
    }
  })
}

const onChange = () => {
  console.log('change')
}
</script>
<style  lang='scss' scoped>
</style>