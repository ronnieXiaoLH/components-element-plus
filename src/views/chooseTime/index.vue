<template>
  <div>
    <m-choose-time @change="change"></m-choose-time>
  </div>
</template>
<script lang='ts' setup>
const change = (val: [String, String]) => {
  console.log('val', val)
}
</script>
<style  lang='scss' scoped>
</style>