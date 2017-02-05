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
    <!-- main -->
    <main>
      <!-- login -->
      <section class="login-section" v-bind:style="{ display: loginVisible }">
        <ghp-login></ghp-login>
      </section>
      <!-- content -->
      <section class="content-section" v-bind:style="{ display: contenVisbile }">
        <!-- search -->
        <div class="search-container">
          <ghp-search></ghp-search>
        </div>
        <!-- projects -->
        <div class="content-container">
          <ghp-content></ghp-content>
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

  .content-section {
    flex: 1 1 auto;
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
    flex: 1 0 auto;
    flex-direction: column;
    margin-top: 24px;
  }
</style>