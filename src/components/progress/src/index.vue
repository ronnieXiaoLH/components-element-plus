<template>
  <el-progress :percentage="percent" v-bind="$attrs"></el-progress>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'm-progress',
})
</script>

<script lang='ts' setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  isAnimation: {
    type: Boolean,
    default: false,
  },
  // 动画时长(单位 ms)
  duration: {
    type: Number,
    default: 3000,
  },
})

const percent = ref(0)
const timer = ref()

onMounted(() => {
  if (props.isAnimation) {
    const t = Math.ceil(props.duration / props.percentage)
    timer.value = setInterval(() => {
      percent.value++
      if (percent.value >= props.percentage) {
        percent.value = props.percentage
        clearInterval(timer.value)
      }
    }, t)
  } else {
    percent.value = props.percentage
  }
})

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
})
</script>
<style  lang='scss' scoped>
</style>