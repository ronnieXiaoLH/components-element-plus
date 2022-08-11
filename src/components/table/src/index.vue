<template>
  <el-table :data="data">
    <template v-for="(item, index) in tableOptions" :key="item.prop + index">
      <el-table-column
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.$index + scope.column.id === currentEditColumn">
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
import { computed, defineComponent, PropType, ref } from 'vue'
import { TableOptions } from './types'
import { toLine } from '../../../utils'

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
})

const tableOptions = computed(() =>
  props.options.filter((item) => !item.action)
)

const action = computed(() => props.options.find((item) => item.action))

const currentEditColumn = ref<string>('')

const edit = (scope: any) => {
  console.log(scope)
  currentEditColumn.value = scope.$index + scope.column.id
}

const emits = defineEmits(['submitEdit', 'cancelEdit'])

// 利用冒泡，实现自定义 editCell 插槽初始化状态
const editCell = () => {
  console.log(1)
  currentEditColumn.value = ''
}

const cancelEdit = (scope: any) => {
  emits('submitEdit')
}

const submitEdit = (scope: any) => {
  emits('cancelEdit')
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