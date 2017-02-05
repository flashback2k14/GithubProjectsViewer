<template>
  <div class="content-section">
    <!-- error message -->
    <div class="error-container">
      <div class="error-text"
          v-if="currentSearchInput == null">
        {{ errorMessage }}
      </div>
    </div>
    <!-- projects row -->
    <div class="separator-title">Projects</div>
    <div class="separator-spacer"></div>
    <!-- row content -->
    <div class="projects-container" v-if="currentSearchInput != null">
      <ghp-project-item 
        v-for="project in projects[projectsKey]" 
        :project="project">
      </ghp-project-item>
    </div>
    <div class="non-available-container" v-if="projectsKey === ''">
      <div class="non-available-text">No Projects avaiable!</div>
    </div>
    <!-- projects columns row -->
    <div class="separator-title">Columns</div>
    <div class="separator-spacer"></div>
    <!-- row content -->
    <div class="columns-container" v-if="currentSearchInput != null">
      <ghp-project-column 
        v-for="column in projectColumns[projectColumnsKey]"
        :column="column">
      </ghp-project-column>
    </div>
    <div class="non-available-container" v-if="projectColumnsKey === ''">
      <div class="non-available-text">No Columns avaiable!</div>
    </div>
    <!-- projects columns cards row -->
    <div class="separator-title">Cards</div>
    <div class="separator-spacer"></div>
    <!-- row content -->
    <div class="cards-container" v-if="currentSearchInput !== null">
      <ghp-column-card
        v-for="card in projectColumnCards[projectColumnCardsKey]"
        :card="card">
      </ghp-column-card>
    </div>
    <div class="non-available-container" v-if="projectColumnCardsKey === ''">
      <div class="non-available-text">No Cards avaiable!</div>
    </div>
  </div>
</template>

<script src="./ghp-content.component.js"></script>

<style scoped>
  .content-section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 1 1 auto;
  }

  .error-container,
  .non-available-container {
    display: flex;
    justify-content: center;
  }
  .error-text {
    font-size: large;
    color: red;
  }

  .non-available-text {
    font-size: large;
    color: #424242;
  }

  .projects-container,
  .columns-container,
  .cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>