<template>
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in data" :key="index">
      <el-menu-item v-if="!item.children?.length" :index="item.index">
        <template #title>
          <component
            v-if="item.icon"
            :is="`el-icon-${toLine(item.icon)}`"
          ></component>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-if="item.children?.length" :index="item.index">
        <template #title>
          <component
            v-if="item.icon"
            :is="`el-icon-${toLine(item.icon)}`"
          ></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <template #title>
            <component
              v-if="item1.icon"
              :is="`el-icon-${toLine(item1.icon)}`"
            ></component>
            <span>{{ item1.name }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'm-menu',
})
</script>

<script lang='ts' setup>
import { MenuItem } from './types'
import { toLine } from '../../../utils'

const props = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  defaultActive: {
    type: String,
    default: '',
  },
  router: {
    type: Boolean,
    default: false,
  },
})
</script>
<style  lang='scss' scoped>
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>