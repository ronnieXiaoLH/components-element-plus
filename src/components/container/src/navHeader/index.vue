<template>
  <div class="header">
    <span @click="toggle" style="cursor: pointer">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>
<script lang='ts' setup>
const propsData = defineProps<{
  collapse: boolean
}>()
const emits = defineEmits(['update:collapse'])
const toggle = () => {
  emits('update:collapse', !propsData.collapse)
}
</script>
<style  lang='scss' scoped>
.header {
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

svg {
  width: 1em;
}
</style>