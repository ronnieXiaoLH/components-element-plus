<template>
  <div>
    <m-table
      :options="options"
      :data="tableData"
      :isEditRow="true"
      :canEditFlag="canEditFlag"
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
import { ref } from '@vue/reactivity'
import { TableOptions } from '../../components/table/src/types'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

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

const handleEdit = (scope: any) => {
  console.log('edit', scope)
  canEditFlag.value = false
}

const handleDelete = (scope: any) => {
  console.log('delete', scope)
  canEditFlag.value = true
}

const canEditFlag = ref<boolean>(false)

const handleSave = (scope: any) => {
  console.log(scope)
}

const handleCancel = (scope: any) => {
  console.log(scope)
}
</script>
<style  lang='scss' scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>