<template>
  <m-menu
    :collapse="collapse"
    :data="data"
    defaultActive="/chooseIcon"
    :router="true"
  ></m-menu>
</template>
<script lang='ts' setup>
defineProps<{
  collapse: boolean
}>()

const data = [
  {
    icon: 'HomeFilled',
    name: '首页',
    index: '/',
  },
  {
    icon: 'Check',
    name: '图标选择',
    index: '/chooseIcon',
  },
  {
    icon: 'Location',
    name: '省市区选择',
    index: '/chooseArea',
  },
  {
    icon: 'Sort',
    name: '趋势标记',
    index: '/trend',
  },
  {
    icon: 'Timer',
    name: '时间选择',
    index: '/chooseTime',
  },
  {
    icon: 'Timer',
    name: '日期选择',
    index: '/chooseDate',
  },
  {
    icon: 'Notification',
    name: '通知菜单',
    index: '/notification',
  },
  {
    icon: 'Menu',
    name: '导航菜单',
    index: '/menu',
  },
  {
    icon: 'AddLocation',
    name: '城市选择',
    index: '/chooseCity',
  },
  {
    icon: 'Open',
    name: '进度条',
    index: '/progress',
  },
  {
    icon: 'Calendar',
    name: '日历',
    index: '/calendar',
  },
  {
    icon: 'Tickets',
    name: '表单',
    index: '/form',
  },
  {
    icon: 'Grid',
    name: '表格',
    index: '/table',
  },
]
</script>
<style  lang='scss' scoped>
</style>