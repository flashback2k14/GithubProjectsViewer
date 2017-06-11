<template>
  <div v-if="project" class="item-container">
    <div class="item-container_title" @click="showProjectColumns">
      {{ project.name }}
    </div>
    <div class="item-container_spacer"></div>
    <div class="body-style" v-html="mdBody"></div>
  </div>
</template>

<script src="./ghp-project-item.component.js"></script>

<style scoped>
  .body-style {
    width: 100%;
    padding: 6px;
    color: #C0CCDA;
    word-wrap: break-word;
  }
</style>