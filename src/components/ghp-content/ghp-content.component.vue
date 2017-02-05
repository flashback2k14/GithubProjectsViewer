<template>
  <div>
    <div class="text-size text-error" 
          v-if="currentSearchInput == null">
      {{ errorMessage }}
    </div>
    <div class="projects-container" v-if="currentSearchInput != null">
      <div v-for="project in projects[projectsKey]">
        <ghp-project-item :project="project"></ghp-project-item>
      </div>
    </div>
    <div class="columns-container" v-if="currentSearchInput != null">
      <div v-for="column in projectColumns[projectColumnsKey]">
        <ghp-project-column :column="column"></ghp-project-column>
      </div>
    </div>
  </div>
</template>

<script src="./ghp-content.component.js"></script>

<style scoped>
  .text-size {
    font-size: large;
  }
  .text-error {
    color: red;
  }

  .projects-container,
  .columns-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
</style>