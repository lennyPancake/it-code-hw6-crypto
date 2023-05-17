<template>
  <h1>Список криптомонет</h1>
  <div class="search-input">
    <el-input
      v-model="searchTerm"
      placeholder="Поиск по валюте (usd, eur, jpy, etc.)"
      clearable
      @input="handleSearch"
    ></el-input>
    <h4>Выберите категорию: </h4>
    <!-- Выпадающий список категорий -->
    <el-dropdown trigger="click" @command="handleCategoryChange">
      <el-button type="primary">
        {{ categoryFilter }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-scrollbar class="category-scrollbar">
        <el-dropdown-item v-for="category in categories" :key="category.category_id" 
        :command="category.category_id">{{ category.name }}</el-dropdown-item>
      </el-scrollbar>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
  <div class="search-input">
    <!-- Ваш код для поискового поля -->
  </div>
  <div class="item-list">
    <template v-if="isLoading">
      <!-- Используем Skeleton для отображения заглушки при загрузке -->
      <el-card v-for="item in items" :key="item.id" class="item-card">
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
      <!-- Отображаем настоящие данные карточек -->
      <el-card v-for="item in items" :key="item.id" class="item-card">
        <router-link :to="'/coins/' + item.id">
          <img :src="item.image" class="item-image">
        </router-link>
        <div class="item-info">
          <h3>{{ item.market_cap_rank }}. {{ item.name }}</h3>
          <p style="text-transform: uppercase;">{{ item.symbol }}</p>
          <p>Цена: {{ item.current_price.toLocaleString() }} {{ symb }} </p>
          <router-link :to="'/coins/' + item.id">Подробнее</router-link>
        </div>
      </el-card>
    </template>
    <!-- Добавляем скролл-индикатор при загрузке следующей страницы -->
    <el-skeleton v-if="isLoading" :active="true" animation="pulse" rows="6"></el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import makeRequest from '../utils/makeRequest';
import { debounce } from 'lodash';
const items = ref([]);
const searchTerm = ref('');
let symb='USD';
const categories = ref([]);
const categoryFilter = ref('None');
//scroll
const currentPage = ref(1); // Текущая страница
const isLoading = ref(false); // Флаг загрузки данных
const loadNextPage = () => {
  isLoading.value = true;
  let apiurl=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${searchTerm.value}&page=${currentPage.value + 1}`;
  if (!searchTerm.value){
    apiurl=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${symb.toLowerCase()}&page=${currentPage.value + 1}`;
  }
  if(categoryFilter.value!=='None'){apiurl += `&category=${categoryFilter.value}`;}
  makeRequest({
    method: 'get',
    url: apiurl,
  })
    .then(({ data }) => {
      items.value = [...items.value, ...data];
      currentPage.value++;
      isLoading.value = false;
    })
    .catch((error) => {
      console.error('Ошибка при загрузке данных:', error);
      isLoading.value = false;
    });
};
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading.value && items.length()===100 ) {
    loadNextPage();
  }
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
//
const handleCategoryChange = (categoryId:string) => {
  categoryFilter.value = categoryId;
  handleSearch();
};
// Получение списка категорий
makeRequest({
  method: "get",
  url: "https://api.coingecko.com/api/v3/coins/categories/list"
}).then(({ data }) => {
  categories.value = data;
  categories.value.unshift({ category_id: 'None', name: 'None' }); // Add "None"
});
const debouncedSearch = debounce((value) => {
  let apiurl=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${value}`;
  if(categoryFilter.value!=='None'){apiurl += `&category=${categoryFilter.value}`;}
  makeRequest({
    method: "get",
    url: apiurl
  }).then(({ data }) => {
    symb=value.toUpperCase();
    items.value = data;
  });
  
}, 500);

makeRequest({  // Используем функцию-обертку
  method: "get",                              // Указываем метод
  url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",  // Указываем путь
}).then(({data}) => {      
  items.value=data;                             // После запроса нам приходит объект из которого мы достаем поле data
});
const handleSearch = () => {
  if (!searchTerm.value){debouncedSearch(symb.toLowerCase());}
  else{debouncedSearch(searchTerm.value);}
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
.type-primary {
  background-color: rgb(14, 14, 51);
  color: white;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
  color: #333;
  background-color: #333;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
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
}
</style>