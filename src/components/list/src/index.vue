<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <div
            class="container"
            v-for="(item2, index2) in item.content"
            :key="index2"
            @click="clickItem(item2, index2)"
          >
            <div class="avater" v-if="item2.avatar">
              <el-avatar size="small" :src="item2.avatar"></el-avatar>
            </div>
            <div class="content">
              <div class="title" v-if="item2.title">
                <div>{{ item2.title }}</div>
                <el-tag v-if="item2.tag" size="mini" :type="item2.tagType">{{
                  item2.tag
                }}</el-tag>
              </div>
              <div class="time" v-if="item2.desc">{{ item2.desc }}</div>
              <div class="time" v-if="item2.time">{{ item2.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div
              class="a-item"
              :class="{ border: i !== actions.length }"
              v-for="(action, i) in actions"
              :key="i"
              @click="clickAction(action, i)"
            >
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'm-list',
})
</script>

<script lang='ts' setup>
import { ListOptions, ActionOptions, ListItem } from './types'
import { toLine } from '../../../utils'
const props = defineProps({
  list: {
    type: Array as PropType<ListOptions>,
    required: true,
  },
  actions: {
    type: Array as PropType<ActionOptions>,
    default: () => [],
  },
})
const emits = defineEmits(['clickItem', 'clickAction'])

const clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}

const clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', { item, index })
}
</script>
<style  lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}

.list-tabs__item {
  .el-tabs__nav {
    width: 100%;
    display: flex;
  }

  .el-tabs__item {
    flex: 1;
    text-align: center;
  }
}
</style>