import bus from "./../../helper/bus";
import ShowdownHelper from "./../../helper/showdown.helper";
import MomentHelper from "./../../helper/moment.helper";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";

export default {
  name: "ghpColumnCard",
  props: ["card", "currentColumnId", "availableColumns"],
  data () {
    return {
      __fetcher: null,
      selected: "",
      moveOptions: []
    }
  },
  computed: {
    mdNote () {
      if (!this.card.note) return "";
      return ShowdownHelper.convertMdToHtml(this.card.note);
    }
  },
  filters: {
    formatDate (value) {
      if (!value) return "";
      return MomentHelper.convert(value);
    }
  },
  watch: {
    selected (columnId, oldColumnId) {
      // alert("new: " + val + ", old: " + oldVal);
      if (oldColumnId) {
        this._moveCardToSelectedColumn(columnId);
      }
    }
  },
  created () {
    this._init();
    this._setupMoveSelection();
    this._onFetchGithubIssue();
  },
  destroyed () {
    this._deinit();
  },
  methods: {
    _init () {
      if (!this.__fetcher) {
        this.__fetcher = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                          StorageHelper.get(StorageHelper.Keys.PW));
      }
    },
    _deinit () {
      this.__fetcher = null;
      this.selected = "";
      this.moveOptions = [];
    },
    _setupMoveSelection () {
      this.moveOptions = this.availableColumns;
      this.selected = this.availableColumns.map(column => {
        if (column.id === this.currentColumnId) {
          return column.id;
        }
      })[0];
    },
    _onFetchGithubIssue () {
      if (!this.card.note && this.card.content_url) {
        this.__fetcher.getIssueData(this.card.content_url)
          .then(result => {
            this.card.note = `&num;${result.number} - ${result.title}`;
          })
          .catch(error => console.error(error));
      }
    },
    _moveCardToSelectedColumn (columnId) {
      this.__fetcher.moveCardToAnotherColumn(this.card.id, columnId)
        .then(result => {
          bus.$emit("show-column-cards", columnId);
        })
        .catch(error => console.error(error));
    }
  }
}