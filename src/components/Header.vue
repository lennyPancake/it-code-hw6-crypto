<template>
    <header class="header">
      <div class="container">
        <h2 class="logo">Crypto</h2>
        <nav class="navigation">
          <slot></slot>
        </nav>
      </div>
    </header>
</template>
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
    font-size: 20px;
    font-weight: bold;
    color: rgb(3, 8, 8);
    text-decoration: none;
  }
  
  .navigation {
    display: flex;
  }
  
  </style>
  