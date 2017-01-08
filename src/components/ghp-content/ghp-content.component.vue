<template>
  <div>
    <div class="text-size text-error" 
          v-if="currentSearchInput == null">
      Error username and/or repo is empty!
    </div>
    <div class="projects-container" v-if="currentSearchInput != null">
      <div v-for="project in githubProjects[githubProjectsKey]">
        <ghp-project-item :project="project"></ghp-project-item>
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

  .projects-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
</style>