<template>
  <el-select
    v-model="provice"
    placeholder="请选择省份"
    :clearable="true"
    @change="handleProviceChange"
  >
    <el-option
      v-for="item in provices"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
  <el-select
    v-model="city"
    :disabled="!provice"
    placeholder="请选择城市"
    :clearable="true"
    style="margin: 0 10px"
    @change="handleCityChange"
  >
    <el-option
      v-for="item in citys"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
  <el-select
    v-model="area"
    :disabled="!provice || !city"
    :clearable="true"
    placeholder="请选择区域"
  >
    <el-option
      v-for="item in areas"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'm-choose-area',
})
</script>

<script lang='ts' setup>
import { computed, ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

export interface Data {
  code: string
  name: string
}

const provices = ref(allAreas)
const provice = ref<string>('')
const city = ref<string>('')
const area = ref<string>('')

const citys = computed(
  () =>
    provices.value.find((item) => item.code === provice.value)?.children || []
)

const areas = computed(
  () => citys.value.find((item) => item.code === city.value)?.children || []
)

const handleProviceChange = () => {
  city.value = ''
  area.value = ''
}

const handleCityChange = () => {
  area.value = ''
}

const emits = defineEmits(['change'])

watch(
  () => area.value,
  (val) => {
    const proviceData: Data = {
      code: provice.value,
      name: '',
    }
    const cityData: Data = {
      code: city.value,
      name: '',
    }
    const areaData: Data = {
      code: val,
      name: '',
    }
    if (val) {
      proviceData.name = provices.value.find(
        (item) => item.code === provice.value
      )!.name
      cityData.name = citys.value.find((item) => item.code === city.value)!.name
      areaData.name = areas.value.find((item) => item.code === val)!.name
    }
    emits('change', {
      provice: proviceData,
      city: cityData,
      area: areaData,
    })
  }
)
</script>
<style  lang='scss' scoped>
</style>