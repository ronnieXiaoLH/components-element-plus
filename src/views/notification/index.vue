<template>
  <!-- <m-notification :isDot="true"></m-notification> -->
  <m-notification :value="100" :max="99">
    <m-list
      :list="list"
      :actions="actions"
      @clickItem="clickItem"
      @clickAction="clickAction"
    ></m-list>
  </m-notification>
</template>
<script lang='ts' setup>
import { list, actions } from './data'

const clickItem = (val: any, index: number) => {
  console.log(val, index)
}

const clickAction = (val: any, index: number) => {
  console.log(val, index)
}
</script>
<style  lang='scss' scoped>
</style>