<template>
  <div class="trend">
    <slot v-if="slots.default"></slot>
    <div class="text" v-else :style="{ color: textColor }">{{ text }}</div>
    <div class="icon">
      <component
        :is="`el-icon-${toLine(upIcon)}`"
        v-if="type === 'up'"
        :style="{ color: upIconColor }"
      ></component>
      <component
        :is="`el-icon-${toLine(downIcon)}`"
        v-else
        :style="{ color: downIconColor }"
      ></component>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, useSlots } from 'vue'
import { toLine } from '../../../utils'

export default defineComponent({
  name: 'm-trend',
})
</script>

<script lang='ts' setup>
const props = defineProps({
  type: {
    type: String,
    default: 'up',
  },
  text: {
    type: String,
    default: '文字',
  },
  upIconColor: {
    type: String,
    default: '#f5222d',
  },
  downIconColor: {
    type: String,
    default: '#52c41a',
  },
  upTextColor: {
    type: String,
    default: '#000',
  },
  downTextColor: {
    type: String,
    default: '#000',
  },
  upIcon: {
    type: String,
    default: 'ArrowUp',
  },
  downIcon: {
    type: String,
    default: 'ArrowDown',
  },
})

const slots = useSlots()

const textColor = computed(() =>
  props.type === 'up' ? props.upTextColor : props.downTextColor
)
</script>
<style  lang='scss' scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    margin-right: 4px;
  }
  .icon {
    width: 0.8em;
    height: 0.8em;
    display: flex;
    align-items: center;
  }
}
</style>