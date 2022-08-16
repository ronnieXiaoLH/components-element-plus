<template>
  <div>
    <m-calendar
      :events="events"
      displayEventEnd
      :eventContent="eventContent"
      @dateClick="dateClick"
      @eventClick="eventClick"
    ></m-calendar>
  </div>
</template>
<script lang='ts' setup>
import { EventClickArg, EventContentArg } from '@fullcalendar/common'
import { DateClickArg } from '@fullcalendar/interaction'
import { ref } from '@vue/reactivity'
import { EventItem } from '../../components/calendar/src/types'

const events = ref<EventItem[]>([
  {
    title: '购物',
    start: '2022-08-18 06:00',
    end: '2022-08-18 12:00',
  },
  {
    title: '写代码',
    start: '2022-08-19 13:30',
    end: '2022-08-19 18:00',
    editable: true,
  },
])

const eventContent = (arg: EventContentArg) => {
  console.log(arg)
  const el = document.createElement('div')
  const arr = arg.timeText.split('-').map((item) => item.trim())
  el.innerHTML = `
    <div>开始时间：${arr[0]}</div>
    <div>结束时间：${arr[1]}</div>
    <div>标题：${arg.event._def.title}</div>
  `
  return {
    domNodes: [el],
  }
}

const dateClick = (val: DateClickArg) => {
  console.log('dateClick', val)
  events.value.push({
    title: '学习',
    start: val.dateStr + ' 08:30',
    end: val.dateStr + ' 10:00',
  })
}

const eventClick = (val: EventClickArg) => {
  console.log('eventClick', val)
}
</script>
<style  lang='scss' scoped>
</style>