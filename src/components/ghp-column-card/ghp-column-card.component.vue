<template>
  <div v-if="card" class="item-container">
    <div class="title-container">
      <div class="title-container_username">
        <div class="title-style">
          {{ card.creator.login }}
        </div>
      </div>
      <div class="title-container_button">
        <select v-model="selected">
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
        last modifyed: {{ card.updated_at | formatDate }}
      </div>
      <div>created: {{ card.created_at | formatDate }}</div>
    </div>
  </div>
</template>

<script src="./ghp-column-card.component.js"></script>

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
    padding: 6px;
    font-size: larger;
    font-weight: bolder;
  }
  .button-style {
    height: 24px;
    background: white;
    border: 1px #E8EAF6 solid;
    border-radius: 2px;
    cursor: pointer;
    transition: 0.3s;
  }
  .button-style:hover {
    border: 1px #BDBDBD solid;
  }
  .note-style {
    width: 100%;
    padding: 6px;
    word-wrap: break-word;
  }
  .date-container {
    padding: 6px;
    font-size: smaller;
  }
  .date-spacing {
    margin-bottom: 5px;
  }
</style>