<template>
  <!--<div class="container container-row">
    <ghp-header></ghp-header>
    <ghp-login v-bind:style="{ display: loginVisible }"></ghp-login>
    <div v-bind:style="{ display: contenVisbile }">
      <ghp-search class="search-container"></ghp-search>
      <ghp-content class="content-container"></ghp-content>
    </div>
  </div>-->
  <div>
    <!-- header -->
    <ghp-header></ghp-header>
    <!-- content -->
    <main>
      <!-- modal -->
      <div class="login-section" v-bind:style="{ display: loginVisible }">
        <ghp-login></ghp-login>
      </div>
      <section v-bind:style="{ display: contenVisbile }">
        <div>
          <ghp-search class="search-container"></ghp-search>
          <ghp-content class="content-container"></ghp-content>
        </div>
      </section>
    </main>
    <!-- footer -->
    <footer>Github</footer>
  </div>
  
</template>

<script src="./ghp-app.component.js"></script>

<style scoped>
  .login-section {
    flex: 1 1 350px;
    align-items: center;
    justify-content: center;
  }
  /*.search-container {
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
  }*/
</style>