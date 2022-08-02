<template>
  <div>
    <m-choose-city
      @changeCityByCity="changeCityByCity"
      @changeCityByProvince="changeCityByProvince"
    ></m-choose-city>
  </div>
</template>
<script lang='ts' setup>
import { City } from '../../components/chooseCity/src/types'
const changeCityByCity = (item: City) => {
  console.log('item', item)
}

const changeCityByProvince = (item: string) => {
  console.log('item', item)
}
</script>
<style  lang='scss' scoped>
</style>