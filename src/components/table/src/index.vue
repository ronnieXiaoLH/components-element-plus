<template>
  <el-table :data="tableData" @row-click="rowClick">
    <template v-for="(item, index) in tableOptions" :key="item.prop + index">
      <el-table-column
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop]"></el-input>
          </template>
          <template v-else>
            <template
              v-if="scope.$index + scope.column.id === currentEditColumn"
            >
              <div class="edit-wrapper" @click="editCell">
                <el-input
                  v-model="scope.row[item.prop]"
                  @click.stop=""
                ></el-input>
                <slot
                  v-if="$slots.editCell"
                  name="editCell"
                  :scope="scope"
                ></slot>
                <template v-else>
                  <el-icon-check
                    class="check"
                    @click="submitEdit(scope)"
                  ></el-icon-check>
                  <el-icon-close
                    class="close"
                    @click="cancelEdit(scope)"
                  ></el-icon-close>
                </template>
              </div>
            </template>
            <template v-else>
              <slot
                v-if="item.slotName"
                :name="item.slotName"
                :scope="scope"
              ></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
              <component
                :is="`el-icon-${toLine(editIcon)}`"
                v-if="item.editable"
                class="edit"
                @click="edit(scope)"
              ></component>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="action.label"
      :align="action.align"
      :width="action.width"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editAction" :scope="scope"></slot>
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { TableOptions } from './types'
import { toLine } from '../../../utils'
import { cloneDeep } from 'lodash-es'

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
  // 可编辑图标
  editIcon: {
    type: String,
    default: 'edit',
  },
  // 是否可编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  canEditFlag: {
    type: Boolean,
    default: false,
  },
})

const tableOptions = computed(() =>
  props.options.filter((item) => !item.action)
)

const action = computed(() => props.options.find((item) => item.action))

const currentEditColumn = ref<string>('')

const edit = (scope: any) => {
  currentEditColumn.value = scope.$index + scope.column.id
}

const emits = defineEmits(['submitEdit', 'cancelEdit'])

// 利用冒泡，实现自定义 editCell 插槽初始化状态
const editCell = () => {
  currentEditColumn.value = ''
}

const cancelEdit = (scope: any) => {
  emits('submitEdit')
}

const submitEdit = (scope: any) => {
  emits('cancelEdit')
}

const tableData = ref<any[]>(cloneDeep(props.data))

onMounted(() => {
  props.isEditRow && addEditFlag()
})

watch(
  () => props.data,
  (val) => {
    tableData.value = val
    props.isEditRow && addEditFlag()
  }
)

const addEditFlag = () => {
  tableData.value = tableData.value.map((item) => {
    // 标识表格这行的数据是否是编辑状态
    item.rowEdit = false
    return item
  })
}

const rowClick = (row: any, column: any) => {
  if (
    column.label === action.value?.label &&
    props.canEditFlag &&
    props.isEditRow
  ) {
    addEditFlag()
    row.rowEdit = true
  }
}
</script>
<style  lang='scss' scoped>
.edit {
  position: relative;
  top: 2px;
  left: 4px;
  width: 1em;
  cursor: pointer;
}
.edit-wrapper {
  display: flex;
  align-items: center;
  svg {
    margin-left: 4px;
    width: 1.5em;
    cursor: pointer;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
</style>