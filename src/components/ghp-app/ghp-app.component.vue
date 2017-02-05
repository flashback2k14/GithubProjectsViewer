<template>
  <div class="container container-row">
    <!-- header -->
    <ghp-header></ghp-header>
    <!-- content -->
    <ghp-login v-bind:style="{ display: loginVisible }"></ghp-login>
    <div v-bind:style="{ display: contenVisbile }">
      <ghp-search class="search-container"></ghp-search>
      <ghp-content class="content-container"></ghp-content>
    </div>
    <!-- footer -->
    
  </div>
</template>

<script src="./ghp-app.component.js"></script>

<style scoped>
  .container {
    display: flex;
  }
  .container-row {
    flex-direction: column;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 24px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-top: 24px;
  }
</style>