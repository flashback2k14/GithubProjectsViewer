import ShowdownHelper from "./../../helper/showdown.helper";
import MomentHelper from "./../../helper/moment.helper";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";

export default {
  name: "ghpColumnCard",
  props: ["card", "currentColumnId", "availableColumns"],
  data () {
    return {
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
    selected (val, oldVal) {
      alert("new: " + val + ", old: " + oldVal);
    }
  },
  created () {
    this._setupMoveSelection();
    this._onFetchGithubIssue();
  },
  methods: {
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
        const fh = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER),
                                   StorageHelper.get(StorageHelper.Keys.PW));

        fh.getIssueData(this.card.content_url)
          .then(result => {
            this.card.note = `&num;${result.number} - ${result.title}`;
          })
          .catch(error => console.error(error));
      }
    }
  }
}