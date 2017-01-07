<template>
  <div v-if="project">
    <p @click="test">{{ project.number }}</p>
    <p>{{ project.name }}</p>
    <code>
      <pre>{{ project.body }}</pre>
    </code>
  </div>
</template>

<script src="./ghp-project-item.component.js"></script>

<style scoped></style>