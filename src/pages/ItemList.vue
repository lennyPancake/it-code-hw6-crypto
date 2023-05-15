<template>
  <h1>Список криптомонет</h1>
  <div class="item-list">
    <el-card v-for="item in items" :key="item.id" class="item-card">
      <router-link :to="'/coins/' + item.id">
        <img :src="item.image" class="item-image">
      </router-link>
      <div class="item-info">
        <h3>{{ item.market_cap_rank }}. {{ item.name }}</h3>
        <p style="text-transform: uppercase;">{{ item.symbol }}</p>
        <p>Цена: {{ item.current_price.toLocaleString() }}$</p>
        <router-link :to="'/coins/' + item.id">Подробнее</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { cryptoList} from '../api/cryptoList.js';
import Header from '../components/Header.vue'
const items = cryptoList;
</script>

<style lang="scss">
.item-list {

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
   background-color: azure;
}
h1{
  color:#002fff8c;
}
.item-card {
  width: calc(19.5% - 1rem);
  background-color: #d0e8ff;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }

  .item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px 4px 0 0;
  }

  .item-info {
    padding: 1rem;

    h3 {
      margin-top: 0;
    }

    p{
    
      margin: 0.5rem 0;
    }

    .detail-link {
      display: block;
      margin-top: 1rem;
      text-align: right;
      color: #409eff;
      text-decoration: underline;

      &:hover {
        color: #66b1ff;
      }
    }
  }
}
</style>