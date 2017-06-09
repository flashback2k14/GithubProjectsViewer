<template>
  <header>
    <div class="header-row_first">
      <div class="header-title">{{ title }}</div>
      <div class="header-logout">
        <button class="btn-logout" @click="logout">
          <span>logout</span>
          <svg style="width:36px; height:36px" viewBox="0 0 36 36">
            <path fill="#fff" d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="header-spacer"></div>
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
    flex: 0 0 120px;
  }
  .btn-logout {
    display: flex;
    width: 120px;
    background: #283593;
    color: white;
    border: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: medium;
  }
  .btn-logout span {
    padding-top: 3px;
    padding-right: 8px;
  }

  .header-spacer {
    height: 4px;
  }

  .header-row_second {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .header-title {
      font-size: x-large;
    }
    .header-logout {
      flex: 0 0 100px;
    }
    .btn-logout {
      width: 100px;
      font-size: small;
    }
  }
</style>