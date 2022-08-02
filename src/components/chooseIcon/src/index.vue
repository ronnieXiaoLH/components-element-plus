<template>
  <el-button @click="handleClick">
    <slot></slot>
  </el-button>
  <el-dialog
    custom-class="choose-icon-dialog"
    v-model="dialogVisible"
    :title="title"
    width="50%"
  >
    <el-scrollbar>
      <div class="container">
        <div
          class="item"
          v-for="item in Object.keys(Icons)"
          :key="item"
          @click="handleCopy(item)"
        >
          <component :is="`el-icon-${toLine(item)}`"></component>
          <div>{{ item }}</div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'm-choose-icon',
})
</script>
<script lang='ts' setup>
import { ref, watch } from 'vue'
import * as Icons from '@element-plus/icons'
import { toLine } from '../../../utils'
import useCopy from '../../../hooks/useCopy'

let props = defineProps<{
  title: string
  visible: boolean
}>()

let dialogVisible = ref<boolean>(props.visible)

let emits = defineEmits(['update:visible'])
const handleClick = () => {
  emits('update:visible', !props.visible)
}
const handleCopy = (item) => {
  useCopy(`<el-icon-${toLine(item)} />`)
}
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)
watch(
  () => dialogVisible.value,
  (val) => {
    emits('update:visible', val)
  }
)
</script>
<style  lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
}

svg {
  width: 2em;
  height: 2em;
}
</style>

<style lang="scss">
.choose-icon-dialog {
  .el-dialog__body {
    height: calc(70vh - 60px - 54px);
    overflow: auto;
  }
}
</style>