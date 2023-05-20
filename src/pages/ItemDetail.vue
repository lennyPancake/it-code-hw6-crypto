<template>
  <template v-if="coin.isLoadingDetail">
    LOADING...
  </template>
  <template v-else>
    <div class=detail>
      <div>
        <h1>{{ coin.dCoins.name }} </h1>
        <h3>{{ coin.dCoins.localization["ru"] }}</h3>
        <img :src="coin.dCoins.image['large']" class="item-image">
      </div>
        <el-descriptions
    class="margin-top"
    title="Общие сведения"
  >
    <el-descriptions-item label="Рыночная капитализация: ">{{ coin.dCoins.market_data.market_cap["usd"].toLocaleString()  }}$</el-descriptions-item>
    <el-descriptions-item label="Цена: ">{{ coin.dCoins.market_data.current_price['usd'].toLocaleString()}} $</el-descriptions-item>
    <el-descriptions-item label="Общее количество: ">{{maxSupply(coin.dCoins.market_data.total_supply)}}</el-descriptions-item>
    <el-descriptions-item label="Максимальное количество: ">{{maxSupply(coin.dCoins.market_data.max_supply)}}</el-descriptions-item>
    <el-descriptions-item label="В обращении: ">{{coin.dCoins.market_data.circulating_supply.toLocaleString()}}</el-descriptions-item>
    <el-descriptions-item label="Сайт: "
      ><a :href=coin.dCoins.links.homepage[0]>{{ coin.dCoins.links.homepage[0] }}</a>
    </el-descriptions-item>
  </el-descriptions>
  <div class="discr">
  <h3>Описание</h3>
  <h4>
  <span style="font-weight: normal;" v-html="coin.dCoins.description['en']"></span>
</h4>
</div>
    </div>
    </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import maxSupply from '../utils/maxSupply'
import { useCoinsStore } from '../store/coins-store';

const id = useRoute().params.id; //coin
const coin = useCoinsStore();
coin.fetchDetailCoin(id)

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