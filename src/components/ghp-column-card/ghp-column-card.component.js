import ShowdownHelper from "./../../helper/showdown.helper";
import MomentHelper from "./../../helper/moment.helper";
import FetchHelper from "./../../helper/fetch.helper";
import StorageHelper from "./../../helper/storage.helper";

export default {
  name: "ghpColumnCard",
  props: ["card"],
  data () {
    return {}
  },
  computed: {
    mdNote: function () {
      if (!this.card.note) return "";
      return ShowdownHelper.convertMdToHtml(this.card.note);
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) return "";
      return MomentHelper.convert(value);
    }
  },
  created () {
    this._onFetchGithubIssue();
  },
  methods: {
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