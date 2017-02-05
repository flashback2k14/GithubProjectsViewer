<template>
  <header>
    <div class="header-title">{{ title }}</div>
    <div class="header-logout">
      <button class="btn-logout" @click="logout">Logout</button>
    </div>
  </header>
</template>

<script src="./ghp-header.component.js"></script>

<style scoped>
  .header-title {
    flex: 1 0 auto;
    font-size: large;
  }
  .header-logout {
    flex: 0 0 50px;
  }
  .btn-logout {
    width: 80px;
    background: #283593;
    color: white;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: small;
  }
  .btn-logout:hover {
    border: 1px solid #1A237E;
    border-radius: 4px;
  }
</style>