<template>
    <div class=detail>
      <div>
        <h1>{{ bitcoin.name }} </h1>
        <h3>{{ bitcoin.localization["ru"] }}</h3>
        <img :src="bitcoin.image['large']" class="item-image">
      </div>
        <el-descriptions
    class="margin-top"
    title="Общие сведения"
  >
    <el-descriptions-item label="Рыночная капитализация: ">{{ bitcoin.market_data.market_cap["usd"].toLocaleString()  }}$</el-descriptions-item>
    <el-descriptions-item label="Цена: ">{{ bitcoin.market_data.current_price['usd'].toLocaleString() }}$</el-descriptions-item>
    <el-descriptions-item label="Общее количество: ">{{bitcoin.market_data.total_supply.toLocaleString()}}</el-descriptions-item>
    <el-descriptions-item label="Максимальное количество: ">{{bitcoin.market_data.max_supply.toLocaleString()}}</el-descriptions-item>
    <el-descriptions-item label="В обращении: ">{{bitcoin.market_data.circulating_supply.toLocaleString()}}</el-descriptions-item>
    <el-descriptions-item label="Сайт: "
      ><a :href=bitcoin.links.homepage[0]>{{ bitcoin.links.homepage[0] }}</a>
    </el-descriptions-item>
  </el-descriptions>
  <div class="discr">
  <h3>Описание</h3>
  <h4>
  <span style="font-weight: normal;" v-html="bitcoin.description['en']"></span>
</h4>
</div>
    </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import { useRoute } from 'vue-router';
import { bitcoin} from '../api/bitcoin.js';
const id = useRoute().params.id; //bitcoin
</script>
<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: azure;
}

.item-image {
  width: 200px;
  height: auto;
  margin-top: 20px;
}

.margin-top {
  
  margin-top: 20px;
}

.discr {
  margin-top: 20px;
}
h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: normal;
}
a{
  text-decoration: none;
}
h4 {
  font-size: 16px;
  margin-top: 0;
}

.el-descriptions {
  width: 100%;
}

.el-descriptions-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>