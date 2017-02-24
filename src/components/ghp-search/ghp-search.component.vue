<template>
  <form @submit.prevent="onSubmit">
    <input type="text" class="input-style" 
            v-model="search.username" 
            placeholder="Enter a Github Username...">
    <input type="text" class="input-style" 
            v-model="search.repo" 
            placeholder="Enter a Github Repo...">
    <button type="submit" 
      class="button-style button-style_search">
        Search
    </button>
    <button type="button" 
      @click.prevent="onClear" 
      class="button-style button-style_clear">
        Clear
    </button>
  </form>
</template>

<script src="./ghp-search.component.js"></script>

<style scoped>
  .input-style {
    width: 310px;
    margin-right: 20px;
    margin-bottom: 5px;
    border: 0;
    border-bottom: 1px solid #283593;
    font-size: medium;
  }
  .input-style:hover {
    border-bottom: 1px solid #FF1744;
  }

  .button-style {
    width: 150px;
    padding: 3px;
    margin-top: 5px;
    border: 0;
    border-radius: 4px;
    font-size: medium;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  .button-style:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  .button-style_search {
    background: #FF1744;
    color: white;
  }

  .button-style_clear {
    margin-left: 12px;
    background: #283593;
    color: white;
  }
</style>