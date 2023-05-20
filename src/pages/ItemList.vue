<template>
  <h1>Поиск криптомонет</h1>
  <div class="search-input">
    <el-input
      v-model="searchTerm"
      placeholder="Поиск..."
      clearable
      @input="handleSearch"
    ></el-input>
  </div>
  <div class="item-list">
    <template v-if=coinsSearch.isLoadingSearch>
      <el-card v-for="item in coinsSearch.sCoins.slice(count-50, count)" :key="item.id" class="item-card">
        <router-link :to="'/coins/' + item.id">
          <el-skeleton :active="true" animation="pulse">
            <img class="item-image" />
          </el-skeleton>
        </router-link>
        <div class="item-info">
          <el-skeleton :active="true" animation="pulse">
            <h3></h3>
            <p></p>
            <p></p>
          </el-skeleton>
        </div>
      </el-card>
    </template>
    <template v-else>
      <el-card v-for="item in coinsSearch.sCoins.slice(0, count)" :key="item.id" class="item-card">
        <router-link :to="'/coins/' + item.id">
          <img :src="item.large" class="item-image">
        </router-link>
        <div class="item-info">
          <h3>{{ item.market_cap_rank }}. {{ item.name }}</h3>
          <p style="text-transform: uppercase;">{{ item.symbol }}</p>
          <router-link :to="'/coins/' + item.id">Подробнее</router-link>
        </div>
      </el-card>
    </template>
    <el-skeleton v-if="isLoading" :active="true" animation="pulse" rows="6"></el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash';
import { useCoinsStore } from '../store/coins-store';
const coinsSearch = useCoinsStore();
coinsSearch.fetchSearchCoin(""); 
let  count= 50;
const searchTerm = ref('');
//scroll
const isLoading = ref(false); // Флаг загрузки данных
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading.value ) {
    if (!(coinsSearch.sCoins.length<=count)){
      coinsSearch.isLoadingSearch=true;
      count+=50;
      coinsSearch.isLoadingSearch=false;
    }
  }
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
const debouncedSearch = debounce((value) => {
coinsSearch.fetchSearchCoin(value)
  
}, 500);

const handleSearch = () => {
debouncedSearch(searchTerm.value);
};

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
  font-family:Arial, Helvetica, sans-serif;
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
.search-input {
  margin-bottom: 1rem;

  .el-input {
    width: 30%;

    input {
      border-radius: 4px;
    }
  }
}
</style>