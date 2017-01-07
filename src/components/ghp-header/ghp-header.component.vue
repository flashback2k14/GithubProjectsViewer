<template>
  <div class="title-container">
    <div class="title">{{ title }}</div>
    <div class="logout">
      <button class="button-logout" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script src="./ghp-header.component.js"></script>

<style scoped>
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    background: #283593;
    color: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  }
  .title {
    display: flex;
    justify-content: flex-start;
    font-size: large;
  }
  .logout {
    display: flex;
    justify-content: flex-end;
  }
  .button-logout {
    width: 80px;
    background: #283593;
    color: white;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: small;
  }
  .button-logout:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
</style>