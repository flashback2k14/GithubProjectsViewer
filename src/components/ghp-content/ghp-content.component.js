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
  data () {
    return {
      __fetcher: null,
      currentSearchInput: {},
      errorMessage: "",
      projects: {},
      projectIds: [],
      projectsKey: "",
      projectColumns: {},
      projectColumnIds: [],
      projectColumnsKey: "",
      projectColumnCards: {},
      projectColumnCardIds: [],
      projectColumnCardsKey: "",
      projectsNonAvailable: true,
      columnsNonAvailable: true,
      cardsNonAvailable: true,
    }
  },
  created () {
    this._init();
    bus.$on("search-changed", this.onSearchChanged);
    bus.$on("clear-content", this.onClearContent);
    bus.$on("show-project-columns", this.onShowProjectColumns);
    bus.$on("show-column-cards", this.onShowColumnCards);
  },
  destroyed () {
    bus.$off("search-changed", this.onSearchChanged);
    bus.$off("clear-content", this.onClearContent);
    bus.$off("show-project-columns", this.onShowProjectColumns);
    bus.$off("show-column-cards", this.onShowColumnCards);
  },
  methods: {
    onSearchChanged (searchInput) {
      if (searchInput) {
        this.currentSearchInput = searchInput;
        this.projectsKey = JSON.stringify(searchInput);
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
        this.projectColumnsKey = projectId;
        this._fetchColumnsData(projectId);
        this._fetchCardsData(-1);
      }
    },
    onShowColumnCards (columnId) {
      if (columnId) {
        this.projectColumnCardsKey = columnId;
        this._fetchCardsData(columnId);
      }
    },
    _init () {
      if (!this.__fetcher) {
        this.__fetcher = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                          StorageHelper.get(StorageHelper.Keys.PW));
      }
    },
    _fetchProjectsData (search) {
      if (this.projects.hasOwnProperty(this.projectsKey)) return;
      
      this.__fetcher.getProjectsData(search.username, search.repo)
        .then(result => {
          if (result.length > 0) {
            this.$set(this.projects, this.projectsKey, result);
            this.projectIds = result.map(project => { return { id: project.id, name: project.name }});
            this.projectsNonAvailable = false;
          } else {
            this._clearData();
          }
        })
        .catch(error => this.errorMessage = error.message);
    },
    _fetchColumnsData (id) {
      this.__fetcher.getColumnsDataById(id)
        .then(result => {
          if (result.length > 0) {
            this.$set(this.projectColumns, this.projectColumnsKey, result);
            this.projectColumnIds = result.map(column => { return { id: column.id, name: column.name }});
            this.columnsNonAvailable = false;
          } else {
            this.columnsNonAvailable = true;
          }
        })
        .catch(error => this.errorMessage = error.message);
    },
    _fetchCardsData (id) {
      if (id === -1) {
        this.projectColumnCards = {};
        this.projectColumnCardsKey = "";
        this.cardsNonAvailable = true;
        return;
      }

      this.__fetcher.getCardsDataById(id)
        .then(result => {
          if (result.length > 0) {
            this.$set(this.projectColumnCards, this.projectColumnCardsKey, result);
            this.projectColumnCardIds = result.map(card => card.id);
            this.cardsNonAvailable = false;
          } else {
            this.cardsNonAvailable = true;
          }
        })
        .catch(error => this.errorMessage = error.message);
    },
    _clearData () {
      this.projectsNonAvailable = true;
      this.columnsNonAvailable = true;
      this.cardsNonAvailable = true;
      this.projects = {};
      this.projectIds = [];
      this.projectsKey = "";
      this.projectColumns = {};
      this.projectColumnIds = [];
      this.projectColumnsKey = "";
      this.projectColumnCards = {};
      this.projectColumnCardIds = [];
      this.projectColumnCardsKey = "";
    }
  }
}