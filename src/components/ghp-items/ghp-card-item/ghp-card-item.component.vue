<template>
  <div v-if="card" class="item-container">
    <div class="title-container">
      <div class="title-container_username">
        <div class="title-style">
          {{ card.creator.login }}
        </div>
      </div>
      <div class="title-container_button">
        <select class="select-style" v-model="selected">
          <option v-for="option in moveOptions" v-bind:value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="item-container_spacer"></div>
    <div class="note-style" v-html="mdNote"></div>
    <div class="item-container_spacer"></div>
    <div class="date-container">
      <div class="date-spacing">
        last modifyed - {{ card.updated_at | formatDate }}
      </div>
      <div>created - {{ card.created_at | formatDate }}</div>
    </div>
  </div>
</template>

<script src="./ghp-card-item.component.js"></script>

<style scoped>
  .title-container {
    display: flex;
    flex-direction: row;
  }
  .title-container_username {
    display: flex;
    flex: 1 0 auto;
  }
  .title-container_button {
    display: flex;
    align-self: center;
    justify-content: flex-end;
  }
  .title-style {
    display: flex;
    color: #E5E9F2;
    padding: 6px;
    font-size: larger;
    font-weight: bolder;
  }
  .select-style {
    width: 130px;
    padding: 4px 0 4px 4px;
    background: #273444 url("./../../../../assets/down.svg") no-repeat 90% 50%;
    color: #E5E9F2;
    font-size: small;
    border: 0 solid white;
    border-bottom: 1px solid #1f2d3d;
    border-radius: 0;
    cursor: pointer;
    overflow: hidden;
    box-shadow: none;
    -webkit-appearance: none;
    outline: none;
  }

  .select-style:hover,
  .select-style:focus {
    border-bottom: 1px solid #FF1744;
  }
  
  .note-style {
    width: 100%;
    padding: 6px;
    color: #C0CCDA;
    word-wrap: break-word;
  }
  .date-container {
    padding: 6px;
    color: #C0CCDA;
    font-size: small;
  }
  .date-spacing {
    margin-bottom: 5px;
  }
</style>