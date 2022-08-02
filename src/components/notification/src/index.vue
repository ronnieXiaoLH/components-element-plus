<template>
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge
        :value="value"
        :max="max"
        :is-dot="isDot"
        style="cursor: pointer"
      >
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'm-notification',
})
</script>

<script lang='ts' setup>
import { toLine } from '../../../utils'
const props = defineProps({
  // 通知图标
  icon: {
    type: String,
    default: 'Bell',
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: '',
  },
  // 最大值
  max: {
    type: Number,
    default: 99,
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>
<style  lang='scss' scoped>
</style>