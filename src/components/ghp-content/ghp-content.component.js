import bus from "./../../helper/bus.js";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";
import GhpProjectItem from "./../ghp-project-item/ghp-project-item.component.vue";
import GhpProjectColumn from "./../ghp-project-column/ghp-project-column.component.vue";
import GhpColumnCard from "./../ghp-column-card/ghp-column-card.component.vue";

export default {
  name: "ghpContent",
  components: {
    "ghp-project-item": GhpProjectItem,
    "ghp-project-column": GhpProjectColumn,
    "ghp-column-card": GhpColumnCard
  },
  /**
   * ToDo: 
   * - Refactoring naming
   * - Refresh view after moving a card
   * -- maybe add some sleep to give github some time!?
   * - why No Cards available is still displaying after cards are available?
   */
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
    }
  }
}