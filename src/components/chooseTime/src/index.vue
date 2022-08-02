<template>
  <div class="container">
    <div class="start-time-wrapper">
      <el-time-select
        v-model="startTime"
        :max-time="endTime"
        class="mr-4"
        :placeholder="startPlaceholder"
        :start="startStart"
        :step="startStep"
        :end="end"
      />
    </div>
    <div class="end-time-wrapper">
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endStart"
        :step="endStep"
        :end="endEnd"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'm-choose-time',
})
</script>

<script lang='ts' setup>
const props = defineProps({
  startPlaceholder: {
    type: String,
    default: '请选择开始时间',
  },
  startStart: {
    type: String,
    default: '00:00',
  },
  startStep: {
    type: String,
    default: '00:30',
  },
  startEnd: {
    type: String,
    default: '24:00',
  },
  endPlaceholder: {
    type: String,
    default: '请选择结束时间',
  },
  endStart: {
    type: String,
    default: '00:00',
  },
  endStep: {
    type: String,
    default: '00:30',
  },
  endEnd: {
    type: String,
    default: '24:00',
  },
})
const startTime = ref('')
const endTime = ref('')

const emits = defineEmits(['change'])

watch(
  () => startTime.value,
  () => {
    emitChange()
  }
)
watch(
  () => endTime.value,
  () => {
    emitChange()
  }
)

const emitChange = () => {
  emits('change', [startTime.value, endTime.value])
}
</script>
<style  lang='scss' scoped>
.container {
  display: flex;
  .start-time-wrapper {
    margin: 0 20px;
  }
}
</style>