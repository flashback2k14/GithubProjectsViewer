<template>
  <div>
    <div class="text-size text-error" v-if="currentSearchInput == null">
      Error username and/or repo is empty!
    </div>
    <div v-if="currentSearchInput != null">
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
</style>