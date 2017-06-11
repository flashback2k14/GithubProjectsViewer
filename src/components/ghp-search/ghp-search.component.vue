<template>
  <form @submit.prevent="onSubmit" class="form-style">
    <div class="form-column_first">
      <div class="form-column_inputs">
        <input type="text" class="input-style" 
                v-model="search.username"
                required
                placeholder="Enter a Github Username...">
        <input type="text" class="input-style" 
                v-model="search.repo"
                required
                placeholder="Enter a Github Repo...">
      </div>
    </div>
    <div class="form-column_second">
      <button type="submit"
        class="button-style button-style_search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" 
              height="24" fill="#ffffff" class="svg-style">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 
            13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 
            4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 
            9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
            </path>
          </svg>
      </button>
      <button type="button" 
        @click.prevent="onClear" 
        class="button-style button-style_clear">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" 
              height="24" fill="#ffffff" class="svg-style">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 
            6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
            </path>
          </svg>
      </button>
    </div>
  </form>
</template>

<script src="./ghp-search.component.js"></script>

<style scoped>
  .form-style {
    display: flex;
    flex-direction: row;
  }
  .form-column_first {
    display: flex;
    justify-content: center;
  }
  .form-column_inputs {
    display: flex;
    flex-direction: row;
  }
  .form-column_second {
    display: flex;
  }

  .input-style {
    width: 310px;
    margin-top: 4px;
    margin-right: 20px;
    margin-bottom: 4px;
    background: #1f2d3d; /*#283593;*/
    color: #F9FAFC; /*#fff;*/
    border: 0;
    border-bottom: 2px solid #273444; /*#1A237E;*/
    font-size: large;
    outline: none;
  }
  .input-style:hover,
  .input-style:focus,
  .input-style:valid {
    border-bottom: 1px solid #FF1744;
  }
  .input-style::placeholder {
    color: #C0CCDA; /*#BDBDBD;*/
  }

  .button-style {
    width: 36px;
    height: 36px;
    margin-left: 12px;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
    transition: 0.3s;
    outline: none;
  }
  .button-style:hover,
  .button-style:focus {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6);
  }
  .button-style_search {
    background: #0D47A1; /*#3D5AFE;*/
  }
  .button-style_clear {
    background: #FF1744;
  }

  .svg-style {
    text-align: center;
    vertical-align: middle;
  }

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    form {
      margin-top: 8px;
    }
    .form-style {
      width: 100%;
    }
    .form-column_first {
      width: 75%;
    }
    .form-column_inputs {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .form-column_second {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 12px;
    }
    .input-style {
      width: 100%;
      margin-right: 4px;
      padding-bottom: 4px;
    }
    .button-style {
      width: 36px;
      height: 36px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
</style>