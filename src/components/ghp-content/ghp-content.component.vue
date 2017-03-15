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
        v-for="project in projects[selectedRepo]" 
        :key="project.id"
        :project="project">
      </ghp-project-item>
    </div>
    <div class="non-available-container" v-if="projectsNonAvailable">
      <div class="non-available-text">No Projects avaiable!</div>
    </div>
    <!-- projects columns row -->
    <div class="separator-title">Columns</div>
    <div class="separator-spacer"></div>
    <!-- row content -->
    <div class="columns-container" v-if="currentSearchInput != null">
      <ghp-column-item 
        v-for="column in columns[selectedProject]"
        :key="column.id"
        :column="column">
      </ghp-column-item>
    </div>
    <div class="non-available-container" v-if="columnsNonAvailable">
      <div class="non-available-text">No Columns avaiable!</div>
    </div>
    <!-- projects columns cards row -->
    <div class="separator-title">Cards</div>
    <div class="separator-spacer"></div>
    <!-- row content -->
    <div class="cards-container" v-if="currentSearchInput !== null">
      <ghp-card-item
        v-for="card in cards[selectedColumn]"
        :key="card.id"
        :card="card"
        :currentColumnId="selectedColumn"
        :availableColumns="columnItems">
      </ghp-card-item>
    </div>
    <div class="non-available-container" v-if="cardsNonAvailable">
      <div class="non-available-text">No Cards avaiable!</div>
      <div class="non-available-spacer" v-if="selectedColumn"></div>
      <div class="non-available-text_mid non-available-text_pointer"
        @click="openNewCardModal()" v-if="selectedColumn">
        Add a new card <strong>+</strong>
      </div>
    </div>

    <ghp-new-card-modal
      :show="showNewCardModal"
      :on-close="handleCloseNewCardModel">
    </ghp-new-card-modal>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 6px 0 12px 0;
  }
  .error-text {
    font-size: large;
    color: red;
  }

  .non-available-text {
    font-size: large;
    color: #424242;
  }

  .non-available-text_mid {
    margin-bottom: 12px;
    font-size: medium;
    color: #424242;
  }

  .non-available-text_mid:hover {
    text-decoration: underline;
  }

  .non-available-text_pointer {
    cursor: pointer;
  }

  .non-available-spacer {
    height: 12px;
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