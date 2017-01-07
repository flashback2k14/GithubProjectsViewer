import bus from "./../../helper/bus";
import StorageHelper from "./../../helper/storage.helper";
import GhpHeader from "./../ghp-header/ghp-header.component.vue";
import GhpLogin from "./../ghp-login/ghp-login.component.vue";
import GhpSearch from "./../ghp-search/ghp-search.component.vue";
import GhpContent from "./../ghp-content/ghp-content.component.vue";

export default {
  name: "ghpApp",
  components: {
    "ghp-header": GhpHeader,
    "ghp-login": GhpLogin,
    "ghp-search": GhpSearch,
    "ghp-content": GhpContent
  },
  data () {
    return {
      loginVisible: "flex",
      contenVisbile: "none"
    }
  },
  created () {
    this.checkUserLogin();
    bus.$on("should-viewstate-changed", this.changeViewState);
  },
  destroyed () {
    bus.$off("should-viewstate-changed", this.changeViewState);
  },
  methods: {
    checkUserLogin () {
      let username = StorageHelper.get(StorageHelper.Keys.USER);
      let password = StorageHelper.get(StorageHelper.Keys.PW);

      if (username && password) {
        this.changeViewState(true);
      } else {
        this.changeViewState(false);
      }
    },
    changeViewState (shouldChange) {
      if (shouldChange) {
        this.loginVisible = "none";
        this.contenVisbile = "block";
      } else {
        this.loginVisible = "flex";
        this.contenVisbile = "none";
      }
    }
  }
}