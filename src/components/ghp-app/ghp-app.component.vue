<template>
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
    <footer>
      <a href="https://github.com/flashback2k14/GithubProjectsViewer" 
        target="_blank" class="anchor-style">
        View Source Code on Github created by flashback2k14
      </a>
    </footer>
  </div>
  
</template>

<script src="./ghp-app.component.js"></script>

<style scoped>
  .login-section {
    flex: 1 1 350px;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 90px);
  }

  .content-section {
    flex: 1 1 auto;
    flex-direction: column;
  }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    margin-top: 24px;
  }

  .content-container {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    margin-top: 12px;
  }

  .anchor-style {
    text-decoration: none;
  }
  .anchor-style:hover {
    text-decoration: underline;
  }
  .anchor-style:visited {
    color: #424242;
  }
</style>