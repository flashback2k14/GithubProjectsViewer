import bus from "./../../helper/bus.js";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";
import GhpProjectItem from "./../ghp-items/ghp-project-item/ghp-project-item.component.vue";
import GhpColumnItem from "./../ghp-items/ghp-column-item/ghp-column-item.component.vue";
import GhpCardItem from "./../ghp-items/ghp-card-item/ghp-card-item.component.vue";
import GhpCardModel from "./../ghp-utils/ghp-card-modal/ghp-card-modal.component.vue";

export default {
  name: "ghpContent",
  components: {
    "ghp-project-item": GhpProjectItem,
    "ghp-column-item": GhpColumnItem,
    "ghp-card-item": GhpCardItem,
    "ghp-card-modal": GhpCardModel
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
      modalType: ["NEWCARD", "UPDATECARD", "DELETECARD"],
      cardModalShow: false,
      cardModalTitle: "",
      cardModalType: "",
      cardModalNote: "",
      cardModalButtonText: "save"
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
    bus.$on("card-item-edit", this.onCardItemEdit);
    bus.$on("card-item-delete", this.onCardItemDelete);
  },
  destroyed () {
    bus.$off("init-content-fetcher", this.onInitContentFetcher);
    bus.$off("search-changed", this.onSearchChanged);
    bus.$off("clear-content", this.onClearContent);
    bus.$off("show-project-columns", this.onShowProjectColumns);
    bus.$off("show-column-cards", this.onShowColumnCards);
    bus.$off("move-card-to-column", this.onMoveCardToColumn);
    bus.$off("card-item-edit", this.onCardItemEdit);
    bus.$off("card-item-delete", this.onCardItemDelete);
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
    onCardItemEdit (card, type) {
      this.openCardModal(type, card.note);
    },
    onCardItemDelete (card, type) {
      alert(type);
    },
    // modal
    openCardModal (type, text) {

      let title = "";

      switch (type) {

        case this.modalType[0]:

          let projectName = "";
          let columnName = "";
    
          const foundProject = this.__getItemById(this.projectItems, this.selectedProject);
          if (foundProject) projectName = foundProject.name;
    
          const foundColumn = this.__getItemById(this.columnItems, this.selectedColumn);
          if (foundColumn) columnName = foundColumn.name;

          title = `ADD A NEW CARD TO <br/> project: ${projectName} / column: ${columnName}`;

          break;

        case this.modalType[1]:
          title = "UPDATE CARD";
          this.cardModalNote = text;
          this.cardModalButtonText = "update";
          break;

        default:
          break;
      }

      this.cardModalTitle = title;
      this.cardModalType = type;
      this.cardModalShow = true;
    },
    handleCardModelClose (noteText, type) {
      // check if note text is available 
      if (!noteText) {
        this.cardModalShow = false;
        return;
      }
      // check modal type
      switch (type) {
        // new card
        case this.modalType[0]:
          this._createNewCard(noteText);
          break;
        // update card
        case this.modalType[1]:
          alert(noteText, type);
          break;
        // show error message
        default:
          this._showMessageToUser("Unknown Type: " + type, true);
      }
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
      this.cardModalShow = false;
      this.cardModalTitle = "";
      this.cardModalType = "";
      this.cardModalNote = "";
      this.cardModalButtonText = "save";
    },
    // snackbar
    _showMessageToUser (msg = "Something went wrong! Please check the developer console for more infos!", isError = true) {
      bus.$emit("show-snackbar", msg, isError);
    },
    // modal actions
    _createNewCard (noteText) {
      // add new Card to Github
      this.__fetcher.addNewCardToColumn(this.selectedColumn, noteText)
        .then(result => {
          // close modal
          this.cardModalShow = false;
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
    // helper
    __getItemById (arr, id) {
      return arr.find(item => item.id === id);
    }
  }
}