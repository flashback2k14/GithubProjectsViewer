<template>
  <div>
    <!-- header -->
    <ghp-header>
      <!-- search -->
      <ghp-search v-bind:style="{ display: searchVisible }"></ghp-search>
    </ghp-header>
    <!-- main -->
    <main>
      <!-- login -->
      <section class="login-section" v-bind:style="{ display: loginVisible }">
        <ghp-login></ghp-login>
      </section>
      <!-- content -->
      <section class="content-section" v-bind:style="{ display: contenVisbile }">
        <div class="content-container">
          <ghp-content></ghp-content>
        </div>
      </section>
      <!-- snackbar -->
      <ghp-snackbar></ghp-snackbar>
    </main>
    <!-- footer -->
    <footer>
      <!-- githug icon -->
      <a href="https://github.com/flashback2k14/GithubProjectsViewer" 
        target="_blank" class="anchor-style">
        <img class="icon-style" src="./../../../assets/github.svg" alt="Github Icon">
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
    height: calc(100vh - 234px);
  }

  .content-section {
    flex: 1 1 auto;
    flex-direction: column;
  }

  .content-container {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
  }

  .anchor-style {
    display: flex;
    flex: 1 1 auto;
    text-decoration: none;
    color: #C0CCDA; /*#424242;*/
  }
  .anchor-style:hover {
    text-decoration: underline;
  }
  .anchor-style:visited {
    color: #C0CCDA; /*#424242;*/
  }

  .icon-style {
    margin-right: 12px;
  }

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .content-container {
      margin-top: 24px;
    }
    .anchor-style {
      justify-content: center;
      font-size: small;
    }
  }
</style>