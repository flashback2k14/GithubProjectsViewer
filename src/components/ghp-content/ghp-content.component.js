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
      currentSearchInput: {},
      errorMessage: "",
      projects: {},
      projectsKey: "",
      projectColumns: {},
      projectColumnsKey: "",
      projectColumnCards: {},
      projectColumnCardsKey: "",
      projectsNonAvailable: true,
      columnsNonAvailable: true,
      cardsNonAvailable: true,
    }
  },
  created () {
    bus.$on("search-changed", this.onSearchChanged);
    bus.$on("show-project-columns", this.onShowProjectColumns);
    bus.$on("show-column-cards", this.onShowColumnCards);
  },
  destroyed () {
    bus.$off("search-changed", this.onSearchChanged);
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
    _fetchProjectsData (search) {
      if (this.projects.hasOwnProperty(this.projectsKey)) return;
      
      const fh = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER), 
                                  StorageHelper.get(StorageHelper.Keys.PW));

      fh.getProjectsData(search.username, search.repo)
        .then(result => {
          if (result.length > 0) {
            this.$set(this.projects, this.projectsKey, result);
            this.projectsNonAvailable = false;
          } else {
            this._clearData();
          }
        })
        .catch(error => this.errorMessage = error.message);
    },
    _fetchColumnsData (id) {
      if (this.projectColumns.hasOwnProperty(this.projectColumnsKey)) return;

      const fh = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                  StorageHelper.get(StorageHelper.Keys.PW));

      fh.getColumnsDataById(id)
        .then(result => {
          if (result.length > 0) {
            this.$set(this.projectColumns, this.projectColumnsKey, result);
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
        return;
      }

      if (this.projectColumnCards.hasOwnProperty(this.projectColumnCardsKey)) return;

      const fh = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                  StorageHelper.get(StorageHelper.Keys.PW));

      fh.getCardsDataById(id)
        .then(result => {
          if (result.length > 0) {
            this.$set(this.projectColumnCards, this.projectColumnCardsKey, result);
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
      this.projectsKey = "";
      this.projectColumns = {};
      this.projectColumnsKey = "";
      this.projectColumnCards = {};
      this.projectColumnCardsKey = "";
    }
  }
}