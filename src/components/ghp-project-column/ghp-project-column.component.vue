<template>
  <div v-if="column" class="column-container">
    <div @click="test">
      <div>{{ column.id }}</div>
      <div>{{ column.name }}</div>
      <div>{{ column.created_at }}</div>
      <div>{{ column.updated_at }}</div>
    </div>
  </div>
</template>

<script src="./ghp-project-column.component.js"></script>

<style scoped>
  .column-container {
    background: red;
    margin-right: 12px;
  }
</style>