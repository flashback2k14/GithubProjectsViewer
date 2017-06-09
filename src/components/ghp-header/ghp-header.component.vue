<template>
  <header>
    <div class="header-row_first">
      <div class="header-title">{{ title }}</div>
      <div class="header-logout">
        <button class="btn-logout" @click="logout">Logout</button>
      </div>
    </div>
    <div class="header-row_second">
      <slot></slot>
    </div>
  </header>
</template>

<script src="./ghp-header.component.js"></script>

<style scoped>
  header {
    display: flex;
    flex-direction: column;
    flex: 0 0 108px;
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% - 24px);
    padding: 12px;
    background: #283593;
    color: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  }

  .header-row_first {
    display: flex;
    flex-direction: row;
  }

  .header-title {
    flex: 1 0 auto;
    font-size: xx-large;
  }
  .header-logout {
    flex: 0 0 60px;
  }
  .btn-logout {
    width: 80px;
    background: #283593;
    color: white;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: medium;
  }

  .header-row_second {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>