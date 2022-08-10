<template>
  <el-table :data="data">
    <template v-for="(item, index) in tableOptions" :key="item.prop + index">
      <el-table-column
        v-if="!item.slotName"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      ></el-table-column>
      <el-table-column
        v-else
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slotName" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="action.label"
      :align="action.align"
      :width="action.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TableOptions } from './types'

export default defineComponent({
  name: 'm-table',
})
</script>

<script lang='ts' setup>
const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
})

const tableOptions = computed(() =>
  props.options.filter((item) => !item.action)
)

const action = computed(() => props.options.find((item) => item.action))
</script>
<style  lang='scss' scoped>
</style>