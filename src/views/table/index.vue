<template>
  <div>
    <m-table
      :options="options"
      :data="tableData"
      :isEditRow="true"
      v-model:canEditFlag="canEditFlag"
      pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="total"
      @currentChange="currentChange"
      @sizeChange="sizeChange"
    >
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <template #action="{ scope }">
        <el-button type="primary" size="small" @click="handleEdit(scope)"
          >Edit</el-button
        >
        <el-button type="primary" size="small" @click="handleDelete(scope)"
          >Delete</el-button
        >
      </template>
      <template #editAction="{ scope }">
        <el-button type="primary" size="small" @click="handleSave(scope)"
          >保存</el-button
        >
        <el-button type="primary" size="small" @click="handleCancel(scope)"
          >取消</el-button
        >
      </template>
      <!-- <template #editCell>
        <el-button size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </template> -->
    </m-table>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { TableOptions } from '../../components/table/src/types'

const tableData = ref([])

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slotName: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true,
  },
  {
    label: '操作',
    align: 'center',
    action: true,
  },
]

const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

onMounted(() => {
  getTableData()
})

const getTableData = () => {
  axios
    .post('/api/list', {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res) => {
      const data = res.data
      console.log(data)
      tableData.value = data.data?.rows
      total.value = data.data.total
    })
}

const handleEdit = (scope: any) => {
  console.log('edit', scope)
}

const handleDelete = (scope: any) => {
  console.log('delete', scope)
  canEditFlag.value = true
}

const canEditFlag = ref<boolean>(false)

const handleSave = (scope: any) => {
  console.log(scope)
  canEditFlag.value = false
}

const handleCancel = (scope: any) => {
  console.log(scope)
  canEditFlag.value = false
}

const currentChange = (val: number) => {
  current.value = val
  getTableData()
}

const sizeChange = (val: number) => {
  pageSize.value = val
  getTableData()
}
</script>
<style  lang='scss' scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>