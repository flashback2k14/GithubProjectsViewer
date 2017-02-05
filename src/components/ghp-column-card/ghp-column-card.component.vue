<template>
  <div v-if="card" class="item-container">
    <div class="item-container_title">
      {{ card.creator.login }}
    </div>
    <div class="item-container_spacer"></div>
    <div class="note-style" v-html="mdNote"></div>
    <div class="item-container_spacer"></div>
    <div class="date-container">
      <div class="date-spacing">
        created: {{ card.created_at | formatDate }}
      </div>
      <div>last modifyed: {{ card.updated_at | formatDate }}</div>
    </div>
  </div>
</template>

<script src="./ghp-column-card.component.js"></script>

<style scoped>
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