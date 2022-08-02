<template>
  <m-choose-area @change="handleChange"></m-choose-area>
</template>
<script lang='ts' setup>
const handleChange = (data: any) => {
  console.log(data)
}
</script>
<style  lang='scss' scoped>
</style>