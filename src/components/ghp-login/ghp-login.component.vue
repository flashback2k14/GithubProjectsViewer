<template>
  <div class="login-form_container">
    <div class="login-form">
      <form @submit.prevent="onSubmit">
        <input type="text" class="input-style" 
                v-model="login.username"
                required
                placeholder="Enter your Github Username...">
        <input type="password" class="input-style" 
                v-model="login.password"
                required
                placeholder="Enter your Github Password...">
        <button type="submit" class="button-style">Login</button>
      </form>
    </div>
  </div>
</template>

<script src="./ghp-login.component.js"></script>

<style scoped>
  .login-form_container {
    display: flex;
    width: 350px;
    height: 175px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    text-align: center;
    border: 1px solid  rgba(0,0,0,0.1);
    border-radius: 6px;
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.6);
    transition: 0.3s;
  }

  .input-style {
    width: 90%;
    margin: 12px;
    padding-bottom: 4px;
    background: #273444;
    color: #F9FAFC;
    border: 0;
    border-bottom: 1px solid #1f2d3d;
    font-size: medium;
    outline: none;
  }
  .input-style::placeholder {
    color: #C0CCDA;
  }
  .input-style:hover,
  .input-style:focus,
  .input-style:valid {
    border-bottom: 1px solid #FF1744;
  }

  .button-style {
    width: 150px;
    margin-top: 12px;
    padding: 3px;
    background: #FF1744;
    color: white;
    border: 0;
    border-radius: 4px;
    font-size: medium;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.4);
    transition: 0.3s;
    outline: none;
  }
  .button-style:hover,
  .button-style:focus {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6);
  }
</style>