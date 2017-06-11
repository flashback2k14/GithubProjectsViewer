import bus from "./../../helper/bus.js";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";
import GhpProjectItem from "./../ghp-items/ghp-project-item/ghp-project-item.component.vue";
import GhpColumnItem from "./../ghp-items/ghp-column-item/ghp-column-item.component.vue";
import GhpCardItem from "./../ghp-items/ghp-card-item/ghp-card-item.component.vue";
import GhpNewCardModel from "./../ghp-utils/ghp-new-card-modal/ghp-new-card-modal.component.vue";

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
      showNewCardButton: false,
      showNewCardModal: false
    }
  },
  created () {
    this.onInitContentFetcher();
    bus.$on("init-content-fetcher", this.onInitContentFetcher);
    bus.$on("search-changed", this.onSearchChanged);
    bus.$on("clear-content", this.onClearContent);
    bus.$on("show-project-columns", this.onShowProjectColumns);
    bus.$on("show-column-cards", this.onShowColumnCards);
    bus.$on("move-card-to-column", this.onMoveCardToColumn);
  },
  destroyed () {
    bus.$off("init-content-fetcher", this.onInitContentFetcher);
    bus.$off("search-changed", this.onSearchChanged);
    bus.$off("clear-content", this.onClearContent);
    bus.$off("show-project-columns", this.onShowProjectColumns);
    bus.$off("show-column-cards", this.onShowColumnCards);
    bus.$off("move-card-to-column", this.onMoveCardToColumn);
  },
  methods: {
    // event handler
    onInitContentFetcher () {
      this.__fetcher = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                        StorageHelper.get(StorageHelper.Keys.PW));
    },
    onSearchChanged (searchInput) {
      if (searchInput) {
        this._clearData();
        this.currentSearchInput = searchInput;
        this.selectedRepo = searchInput.repo;
        this._fetchProjectsData(searchInput);
      } else {
        this._showMessageToUser("Error username and/or repo is empty!");
        this._clearData();
        this.currentSearchInput = null;
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
        this.showNewCardButton = true;
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
    handleCloseNewCardModel (noteText) {
      // check if note text is available 
      if (!noteText) {
        this.showNewCardModal = false;
        return;
      }
      // add new Card to Github
      this.__fetcher.addNewCardToColumn(this.selectedColumn, noteText)
        .then(result => {
          // close modal
          this.showNewCardModal = false;
          // check if result is empty
          if (!result) return;
          // check if cards has already data
          //  YES = push result into cards array
          //  NOPE = init cards object
          if (this.cards) {
            this.cards[this.selectedColumn].push(result); 
          } else {
            this.$set(this.cards, this.selectedColumn, result);
          }
          // add cards id to array
          this.cardIds.push(result.id);
        })
        .catch(error => this._showMessageToUser(error.message));
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
          // check if github api throw an error
          if (result.hasOwnProperty("documentation_url")) {
            this._showMessageToUser(`Error: ${result.message} - ${result.documentation_url}`);
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
        .catch(error => this._showMessageToUser(error.message));
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
          // check if github api throw an error
          if (result.hasOwnProperty("documentation_url")) {
            this._showMessageToUser(`Error: ${result.message} - ${result.documentation_url}`);
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
        .catch(error => this._showMessageToUser(error.message));
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
          // check if github api throw an error
          if (result.hasOwnProperty("documentation_url")) {
            this._showMessageToUser(`Error: ${result.message} - ${result.documentation_url}`);
            return;
          }
          // set result to cards object
          this.$set(this.cards, this.selectedColumn, result);
          // change flag value
          this.cardsNonAvailable = false;
          // set card ids
          this.cardIds = result.map(card => card.id);
        })
        .catch(error => this._showMessageToUser(error.message));
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
      this.showNewCardButton = false;
      this.showNewCardModal = false;
    },
    // snackbar
    _showMessageToUser (msg = "Something went wrong! Please check the developer console for more infos!", isError = true) {
      bus.$emit("show-snackbar", msg, isError);
    }
  }
}