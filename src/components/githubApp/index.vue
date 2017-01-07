<template>
  <div class="container container-row">
    <!-- header -->
    <github-header></github-header>
    <!-- content -->
    <github-login v-bind:style="{ display: loginVisible }"></github-login>
    <div v-bind:style="{ display: contenVisbile }">
      <github-input class="input-container"></github-input>
      <github-output class="output-container"></github-output>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
  .container {
    display: flex;
  }
  .container-row {
    flex-direction: column;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin-top: 24px;
  }

  .output-container {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }
</style>