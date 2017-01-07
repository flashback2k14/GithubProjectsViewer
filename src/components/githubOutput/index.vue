<template>
  <div>
    <div class="text-size text-error" v-if="currentSearchInput == null">
      Error username and/or repo is empty!
    </div>
    <div v-if="currentSearchInput != null">
      <div v-for="project in githubProjects[githubProjectsKey]">
        <github-project :project="project"></github-project>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>
  .text-size {
    font-size: large;
  }
  .text-error {
    color: red;
  }
</style>