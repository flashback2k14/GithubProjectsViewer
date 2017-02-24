import StorageHelper from "./../../helper/storage.helper";
import bus from "./../../helper/bus.js";

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
    this.getInputFromStorage();
  },
  methods: {
    onSubmit (event) {
      if (this.search.username && this.search.repo) {
        this.setInputToStorage(this.search);
        bus.$emit("search-changed", this.search);
      } else {
        this.setInputToStorage(null);
        bus.$emit("search-changed", null);
      }
    },
    onClear (event) {
      this.setInputToStorage(null);
      bus.$emit("clear-content", null);
    },
    setInputToStorage (search) {
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
    getInputFromStorage () {
      this.$set(this.search, "username", StorageHelper.get(StorageHelper.Keys.SEARCHUSER));
      this.$set(this.search, "repo", StorageHelper.get(StorageHelper.Keys.SEARCHREPO));
    }
  }
}