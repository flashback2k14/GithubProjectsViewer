<template>
  <div class="content-section">
    <!-- error message -->
    <div class="error-container">
      <div class="text-size text-error" 
          v-if="currentSearchInput == null">
        {{ errorMessage }}
      </div>
    </div>
    <!-- projects row -->
    <div class="projects-container" v-if="currentSearchInput != null">
      <ghp-project-item 
        v-for="project in projects[projectsKey]" 
        :project="project">
      </ghp-project-item>
    </div>
    <!-- projects columns row -->
    <div class="columns-container" v-if="currentSearchInput != null">
      <ghp-project-column 
        v-for="column in projectColumns[projectColumnsKey]"
        :column="column">
      </ghp-project-column>
    </div>
  </div>
</template>

<script src="./ghp-content.component.js"></script>

<style scoped>
  .content-section {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .error-container {
    display: flex;
    justify-content: center;
  }
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
  }
</style>