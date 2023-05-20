<template>
    <h1>Сортировка криптомонет по категории</h1>
    <div class="search-input">
      <h4>Выберите категорию: </h4>
      <el-dropdown trigger="click" @command="handleCategoryChange">
        <el-button type="primary">
          {{ categoryFilter }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-scrollbar class="category-scrollbar">
          <el-dropdown-item v-for="category in coinsCategory.cList" :key="category.category_id" 
          :command="category.category_id">{{ category.name }}</el-dropdown-item>
        </el-scrollbar>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    </div>
    <div class="item-list">
      <template v-if=coinsCategory.isLoadingCategory>
        <el-card v-for="item in coinsCategory.cCoins.slice(0,count)" :key="item.id" class="item-card">
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
        <el-card v-for="item in coinsCategory.cCoins.slice(0, count)" :key="item.id" class="item-card">
          <router-link :to="'/coins/' + item.id">
            <img :src="item.image" class="item-image">
          </router-link>
          <div class="item-info">
            <h3>{{ item.market_cap_rank }}. {{ item.name }}</h3>
            <p style="text-transform: uppercase;">{{ item.symbol }}</p>
            <router-link :to="'/coins/' + item.id">Подробнее</router-link>
          </div>
        </el-card>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ArrowDown } from '@element-plus/icons-vue'
  import { onMounted, ref } from 'vue';
  import { useCoinsStore } from '../store/coins-store';
  const coinsCategory = useCoinsStore();
  coinsCategory.cCoins=[];
  let count= 50;
  let page = 1;
  const categoryFilter = ref('None');
  coinsCategory.getCategoryList();
  //scroll
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollHeight - scrollTop - clientHeight < 200 && !coinsCategory.isLoadingCategory) {
      if ((coinsCategory.cCoins.length==count)){
        const selectedCategory = coinsCategory.cList.find((category) => category.name === categoryFilter.value);
        page++;
        coinsCategory.fetchCategoryCoin(selectedCategory.category_id,page);
        count+=50;
      }
    }
  };
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  const handleCategoryChange = (categoryId: string) => {
    
    const selectedCategory = coinsCategory.cList.find((category) => category.category_id === categoryId);
    if (selectedCategory && categoryFilter.value!==categoryId) {
      categoryFilter.value = selectedCategory.name;
      page=1;
      count=50;
      coinsCategory.fetchCategoryCoin(categoryId,page);
    }
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
  .el-dropdown-menu {
    width: 200px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  .el-dropdown-item {
    padding: 8px 16px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #f5f5f5;
    }
  }

  .example-showcase .el-dropdown + .el-dropdown {
    margin-left: 15px;
    color: #333;
    background-color: #333;
  }
  .category-scrollbar {
    max-height: 200px; //высота скролл-бара
    overflow-y: auto; // вертикальная прокрутка
    overflow-x: hidden; // Скрыть горизонтальную прокрутку
  }
  h4{
    font-weight: normal;
    padding-left: 10px;
    display: inline;
    font-size: larger;
  }
  </style>