<template>
  <div v-if="column" class="item-container">
    <div class="item-container_title" @click="showColumnCards">
      {{ column.name }}
    </div>
    <div class="item-container_spacer"></div>
    <div class="body-style">
      <div class="date-spacing">
        last modifyed - {{ column.updated_at | formatDate }}
      </div>
      <div>created - {{ column.created_at | formatDate }}</div>
    </div>
  </div>
</template>

<script src="./ghp-column-item.component.js"></script>

<style scoped>
  .body-style {
    padding: 6px;
    color: #C0CCDA;
    font-size: small;
  }
  .date-spacing {
    margin-bottom: 5px;
  }
</style>