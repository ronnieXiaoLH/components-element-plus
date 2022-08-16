<template>
  <div id="calendar"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'm-calendar',
})
</script>

<script lang='ts' setup>
import '@fullcalendar/core/vdom' // 在 vite 中使用需要导入
import { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core'
import daygrid from '@fullcalendar/daygrid'
import interaction, { DateClickArg } from '@fullcalendar/interaction'
import { EventItem } from './types'

const props = defineProps({
  // 语言
  local: {
    type: String,
    default: 'zh-cn',
  },
  // 视图模式
  initalView: {
    type: String,
    default: 'dayGridMonth',
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => ({
      today: '今天',
      day: '日',
      week: '周',
      month: '月',
      prev: '上一月',
      next: '下一月',
      prevYear: '上一年',
      nextYear: '下一年',
    }),
  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => ({
      start: 'title',
      center: '',
      end: 'prev today next',
    }),
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: () => ({}),
  },
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
  // 显示事件的结束时间
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
  // 自定义事件的渲染内容
  eventContent: {
    type: Function,
  },
})

const calendar = ref<Calendar>()

const emits = defineEmits(['dateClick', 'eventClick'])

const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initalView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      // events: props.events,
      eventSources: [
        {
          // 渲染日历的事件
          events(e, callback) {
            callback(props.events)
          },
        },
      ],
      dateClick(info: DateClickArg) {
        emits('dateClick', info)
      },
      eventClick(info: EventClickArg) {
        emits('eventClick', info)
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent,
    })
    calendar.value.render()
  }
}

onMounted(() => {
  renderCalendar()
})

watch(
  () => props.events,
  () => {
    renderCalendar()
  },
  {
    deep: true,
  }
)
</script>
<style  lang='scss' scoped>
</style>