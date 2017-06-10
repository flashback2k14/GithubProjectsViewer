import bus from "./../../helper/bus.js";
import StorageHelper from "./../../helper/storage.helper";

export default {
  name: "ghpSearch",
  data () {
    return {
      search: {
        username: "",
        repo: ""
      }
    }
  },
  created () {
    bus.$on("clear-search", this.onClearSearch);
    this._getInputFromStorage();
  },
  destroyed () {
    bus.$off("clear-search", this.onClearSearch);
  },
  methods: {
    // event listeners
    onSubmit (event) {
      if (this.search.username && this.search.repo) {
        this._setInputToStorage(this.search);
        bus.$emit("search-changed", this.search);
      } else {
        this._setInputToStorage(null);
        bus.$emit("search-changed", null);
      }
    },
    onClear (event) {
      this._setInputToStorage(null);
      bus.$emit("clear-content");
    },
    onClearSearch (event) {
      this._setInputToStorage(null);
    },
    // private functions
    _setInputToStorage (search) {
      if (search) {
        StorageHelper.set(StorageHelper.Keys.SEARCHUSER, search.username);
        StorageHelper.set(StorageHelper.Keys.SEARCHREPO, search.repo);
      } else {
        StorageHelper.remove(StorageHelper.Keys.SEARCHUSER);
        StorageHelper.remove(StorageHelper.Keys.SEARCHREPO);
        this.search.username = "";
        this.search.repo = "";
      }
    },
    _getInputFromStorage () {
      this.$set(this.search, "username", StorageHelper.get(StorageHelper.Keys.SEARCHUSER));
      this.$set(this.search, "repo", StorageHelper.get(StorageHelper.Keys.SEARCHREPO));
    }
  }
}