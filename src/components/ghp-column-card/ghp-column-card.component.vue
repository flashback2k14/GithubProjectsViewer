<template>
  <div v-if="card" class="item-container">
    <div>{{ card.id }}</div>
    <div>{{ card.note }}</div>
    <div>{{ card.creator.login }}</div>
  </div>
</template>

<script src="./ghp-column-card.component.js"></script>

<style scoped></style>