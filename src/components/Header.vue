<template>
    <header class="header">
      <div class="container">
        <h2 class="logo">Crypto</h2>  
        <nav class="navigation">
          <router-link to="/coins" v-if="!($route.path==='/coins')" class="navigation-link">Поиск криптомонет</router-link>
          <router-link to="/coins/categories" v-if="!($route.path==='/coins/categories')" class="navigation-link">Категории криптомонет</router-link>
        </nav>
      </div>
    </header>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>

  .header {
    background-color: #a1d0fc;
    color: rgb(0, 0, 0);
    padding: 16px 0;
  }
  
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .logo {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: rgb(3, 8, 8);
    text-decoration: none;
  }
  
  .navigation {
    display: flex;
  }
  .navigation-link {
  color: #333;
  text-decoration: none;
  margin: 10px  ;
}

.navigation-link:hover {
  color: #555;
}
  </style>
  