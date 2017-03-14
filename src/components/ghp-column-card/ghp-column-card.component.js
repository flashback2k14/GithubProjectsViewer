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
      selected: 0,
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
    // life cycle events
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
    // setup options select
    _setupMoveSelection () {
      this.moveOptions = this.availableColumns;
      const selectedItems = this.availableColumns.filter(column => {
        if (column.id === this.currentColumnId) {
          return column;
        }
      });
      this.selected = selectedItems[0].id;
    },
    // fetch issue data from Github API
    _onFetchGithubIssue () {
      if (!this.card.note && this.card.content_url) {
        this.__fetcher.getIssueData(this.card.content_url)
          .then(result => {
            this.card.note = `&num;${result.number} - ${result.title}`;
          })
          .catch(error => console.error(error));
      }
    },
    // move card to another column
    _moveCardToSelectedColumn (columnId) {
      this.__fetcher.moveCardToAnotherColumn(this.card.id, columnId)
        .then(result => {
          bus.$emit("move-card-to-column", columnId);
        })
        .catch(error => console.error(error));
    }
  }
}