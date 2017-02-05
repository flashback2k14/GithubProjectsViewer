<template>
  <div v-if="project" class="project-container">
    <div class="title-style" @click="showProjectColumns">
      {{ project.name }}
    </div>
    <div class="spacer"></div>
    <div class="body-style" v-html="mdBody"></div>
  </div>
</template>

<script src="./ghp-project-item.component.js"></script>

<style scoped>
  .project-container {
    width: 300px;
    height: 100%;
    margin-right: 24px;
    margin-bottom: 24px;
    padding: 6px 12px 6px 12px;
    overflow-x: auto;
    border: 1px solid  rgba(0,0,0,0.1);
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  .project-container:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .title-style {
    padding: 6px;
    font-size: larger;
    font-weight: bolder;
    cursor: pointer;
  }

  .spacer {
    height: 2px;
    margin: 6px 0 6px 0;
    background: rgba(0,0,0,0.2);
  }

  .body-style {
    width: 100%;
    padding: 6px;
    word-wrap: break-word;
  }
</style>