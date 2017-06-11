<template>
  <div ref="snackbar" class="snackbar">{{ message }}</div>
</template>

<script src="./ghp-snackbar.component.js"></script>

<style scoped>
  .snackbar {
    position: fixed;
    left: 50%;
    bottom: 24px;
    min-width: 250px;
    margin-left: -125px;
    padding: 16px;
    text-align: center;
    border-radius: 4px;
    z-index: 1;
    visibility: hidden;
  }
  .snackbar-colors_info {
    background: #1f2d3d;
    color: #fff;
  }
  .snackbar-colors_error {
    background: #D50000;
    color: #fff;
  }
  .snackbar-show {
    -webkit-animation: fadein 0.5s, fadeout 0.5s 3.5s;
    animation: fadein 0.5s, fadeout 0.5s 3.5s;
    visibility: visible;
  }

  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 24px; opacity: 1;}
  }
  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 24px; opacity: 1;}
  }

  @-webkit-keyframes fadeout {
    from {bottom: 24px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
  }
  @keyframes fadeout {
    from {bottom: 24px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
</style>
