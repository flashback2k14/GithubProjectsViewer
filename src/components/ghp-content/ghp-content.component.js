import bus from "./../../helper/bus.js";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";
import GhpProjectItem from "./../ghp-items/ghp-project-item/ghp-project-item.component.vue";
import GhpColumnItem from "./../ghp-items/ghp-column-item/ghp-column-item.component.vue";
import GhpCardItem from "./../ghp-items/ghp-card-item/ghp-card-item.component.vue";
import GhpNewCardModel from "./../ghp-modals/ghp-new-card-modal/ghp-new-card-modal.component.vue";

export default {
  name: "ghpContent",
  components: {
    "ghp-project-item": GhpProjectItem,
    "ghp-column-item": GhpColumnItem,
    "ghp-card-item": GhpCardItem,
    "ghp-new-card-modal": GhpNewCardModel
  },
  data () {
    return {
      __fetcher: null,
      currentSearchInput: {},
      errorMessage: "",
      selectedRepo: "",
      projects: {},
      projectItems: [],
      projectsNonAvailable: true,
      selectedProject: "",
      columns: {},
      columnItems: [],
      columnsNonAvailable: true,
      selectedColumn: "",
      cards: {},
      cardIds: [],
      cardsNonAvailable: true,
      showNewCardModal: false
    }
  },
  created () {
    this._init();
    bus.$on("search-changed", this.onSearchChanged);
    bus.$on("clear-content", this.onClearContent);
    bus.$on("show-project-columns", this.onShowProjectColumns);
    bus.$on("show-column-cards", this.onShowColumnCards);
    bus.$on("move-card-to-column", this.onMoveCardToColumn);
  },
  destroyed () {
    bus.$off("search-changed", this.onSearchChanged);
    bus.$off("clear-content", this.onClearContent);
    bus.$off("show-project-columns", this.onShowProjectColumns);
    bus.$off("show-column-cards", this.onShowColumnCards);
    bus.$off("move-card-to-column", this.onMoveCardToColumn);
    this._deinit();
  },
  methods: {
    // life cycle events
    _init () {
      if (!this.__fetcher) {
        this.__fetcher = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                          StorageHelper.get(StorageHelper.Keys.PW));
      }
    },
    _deinit() {
      this.__fetcher = null;
      this._clearData();
    },
    // event handler
    onSearchChanged (searchInput) {
      if (searchInput) {
        this._clearData();
        this.currentSearchInput = searchInput;
        this.selectedRepo = searchInput.repo;
        this._fetchProjectsData(searchInput);
      } else {
        this.currentSearchInput = null;
        this.errorMessage = "Error username and/or repo is empty!";
        this._clearData();
      }
    },
    onClearContent () {
      this.currentSearchInput = null;
      this._clearData();
    },
    onShowProjectColumns (projectId) {
      if (projectId) {
        this.selectedProject = projectId;
        this._fetchColumnsData(projectId);
        this._fetchCardsData(-1);
      }
    },
    onShowColumnCards (columnId) {
      if (columnId) {
        this.selectedColumn = columnId;
        this._fetchCardsData(columnId);
      }
    },
    onMoveCardToColumn (columnId) {
      if (columnId) {
        this.cards = {};
        this.cardIds = [];
        this.cardsNonAvailable = true;
        this.selectedColumn = columnId;
        this._fetchCardsData(columnId);
      }
    },
    // modal
    openNewCardModal () {
      this.showNewCardModal = true;
    },
    handleCloseNewCardModel (e) {
      const noteText = e;
      if (!noteText) {
        console.error("No Text available!");
        return;
      }
      this.__fetcher.addNewCardToColumn(this.selectedColumn, noteText)
        .then(result => {
          this.showNewCardModal = false;

          if (!result) return;

          if (this.cards) {
            this.$set(this.cards, this.selectedColumn, result);
          } else {
            this.cards[this.selectedColumn].push(result); 
          }
          this.cardIds.push(result.id);
        })
        .catch(error => this.errorMessage = error.message);
    },
    // data fetcher
    _fetchProjectsData (search) {
      // return if searched data is already available
      if (this.projects.hasOwnProperty(this.selectedRepo)) return;
      // fetch data from Github API
      this.__fetcher.getProjectsData(search.username, search.repo)
        .then(result => {
          // no projects available
          if (result.length === 0) {
            this._clearData();
            return;
          }
          // set result to columns object
          this.$set(this.projects, this.selectedRepo, result);
          // change flag value
          this.projectsNonAvailable = false;
          // set project items
          this.projectItems = result.map(project => { 
            return { 
              id: project.id, 
              name: project.name 
            };
          });
        })
        .catch(error => this.errorMessage = error.message);
    },
    _fetchColumnsData (id) {
      // return if data for id is already available
      if (this.columns.hasOwnProperty(this.selectedProject)) return;
      // fetch data from Github API
      this.__fetcher.getColumnsDataById(id)
        .then(result => {
          // no columns available
          if (result.length === 0) {
            this.columnsNonAvailable = true;
            return;
          }
          // set result to columns object
          this.$set(this.columns, this.selectedProject, result);
          // change flag value
          this.columnsNonAvailable = false;
          // set column items
          this.columnItems = result.map(column => { 
            return { 
              id: column.id, 
              name: column.name 
            };
          });
        })
        .catch(error => this.errorMessage = error.message);
    },
    _fetchCardsData (id) {
      // clear cards if id is -1 and return
      if (id === -1) {
        this.selectedColumn = "";
        this.cards = {};
        this.cardsNonAvailable = true;
        return;
      }
      // return if data for id is already available
      if (this.cards.hasOwnProperty(this.selectedColumn)) return;
      // fetch data from Github API
      this.__fetcher.getCardsDataById(id)
        .then(result => {
          // no cards available
          if (result.length === 0) {
            this.cards = {};
            this.cardIds = [];
            this.cardsNonAvailable = true;
            return;
          }
          // set result to cards object
          this.$set(this.cards, this.selectedColumn, result);
          // change flag value
          this.cardsNonAvailable = false;
          // set card ids
          this.cardIds = result.map(card => card.id);
        })
        .catch(error => this.errorMessage = error.message);
    },
    // clear all data
    _clearData () {
      this.selectedRepo = "";
      this.projects = {};
      this.projectItems = [];
      this.projectsNonAvailable = true;
      this.selectedProject = "";
      this.columns = {};
      this.columnItems = [];
      this.columnsNonAvailable = true;
      this.selectedColumn = "";
      this.cards = {};
      this.cardIds = [];
      this.cardsNonAvailable = true;
      this.showNewCardModal = false;
    }
  }
}