<template>
  <el-popover
    :visible="visible"
    placement="bottom-start"
    :width="420"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <div class="container" @click="toggle">
        <div>{{ result }}</div>
        <el-icon-arrowdown :class="{ rotate: visible }"></el-icon-arrowdown>
      </div>
    </template>
    <div class="content">
      <el-row align="middle">
        <el-col :span="8">
          <el-radio-group v-model="chooseType" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :span="16">
          <el-select
            v-model="value"
            filterable
            :filter-method="filterCity"
            placeholder="请搜索城市"
            size="small"
            style="width: 270px"
            @change="handleChange"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>

      <template v-if="chooseType === '按城市'">
        <div class="city-letter">
          <div
            class="city-letter-item"
            v-for="item in Object.keys(cities)"
            :key="item"
            @click="clickChat(item)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row :id="key">
              <el-col :span="2">{{ key }}：</el-col>
              <el-col :span="22">
                <div class="city-wrapper">
                  <div
                    class="city-item"
                    v-for="item in value"
                    :key="item.id"
                    @click="clickItem(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province-letter">
          <div
            :class="[
              'province-letter-item',
              { 'long-letter': item.length > 1 },
            ]"
            v-for="item in Object.keys(provinces)"
            :key="item"
            @click="clickProviceChat(item)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template v-for="item2 in item" :key="item2.id">
              <el-row :id="`province-${item2.id}`">
                <el-col :span="4">{{ item2.name }}：</el-col>
                <el-col :span="20">
                  <div class="city-wrapper">
                    <div
                      class="city-item"
                      v-for="item3 in item2.data"
                      :key="item3"
                      @click="changeCity(item3)"
                    >
                      {{ item3 }}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'm-choose-city',
})
</script>

<script lang='ts' setup>
import city from '../lib/city'
import province from '../lib/province.json'
import { City, Province } from './types'

const result = ref<string>('请选择')
const visible = ref<boolean>(false)
const chooseType = ref<string>('按省份')
const value = ref<string>('')
const options = ref<City[]>([])
const cities = ref(city.cities)
const provinces = ref(province)

onMounted(() => {
  options.value = Object.values(city.cities).flat(2)
})

const filterCity = (val: string) => {
  const values = Object.values(city.cities).flat(2)
  val = val.trim()
  console.log('val', val)
  options.value = values
  if (!val.length) return options.value
  if (chooseType.value === '按城市') {
    return (options.value = values.filter(
      (item) => item.spell.indexOf(val) !== -1 || item.name.indexOf(val) !== -1
    ))
  }
  options.value = values.filter((item) => item.name.indexOf(val) !== -1)
}

const emits = defineEmits(['changeCityByProvince', 'changeCityByCity'])

const toggle = () => {
  visible.value = !visible.value
}

const clickItem = (item: City) => {
  result.value = item.name
  visible.value = false
  emits('changeCityByCity', item)
}

const clickChat = (chat: string) => {
  const el = document.getElementById(chat)
  el && el.scrollIntoView()
}

const clickProviceChat = (chat: string) => {
  const el = document.getElementById(`province-${chat}`)
  el && el.scrollIntoView()
}

const changeCity = (city: string) => {
  result.value = city
  visible.value = false
  emits('changeCityByProvince', city)
}

const handleChange = (id: Number) => {
  const item = options.value.find((item) => item.id === id)
  if (!item) return
  result.value = item.name
  if (chooseType.value === '按城市') {
    emits('changeCityByCity', item)
  } else {
    emits('changeCityByProvince', item.name)
  }
}
</script>
<style  lang='scss' scoped>
.container {
  width: fit-content;
  display: flex;
  cursor: pointer;
}
.content {
  .city-letter,
  .province-letter {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .city-letter-item,
    .province-letter-item {
      width: 20px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      margin-right: 8px;
      border: 1px solid #eee;
      cursor: pointer;
      &.long-letter {
        width: fit-content;
        padding: 0 4px;
      }
    }
  }
  .city-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .city-item {
    margin: 0 6px 6px 0;
    cursor: pointer;
  }
}

.rotate {
  transform: rotate(180deg);
}
svg {
  position: relative;
  width: 1em;
  margin-left: 4px;
  transition: all 0.25s;
}
</style>