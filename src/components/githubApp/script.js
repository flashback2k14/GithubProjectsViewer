import bus from "./../helper/bus";
import StorageHelper from "./../helper/storageHelper";
import GithubHeaderComponent from "./../githubHeader/index.vue";
import GithubLoginComponent from "./../githubLogin/index.vue";
import GithubInputComponent from "./../githubInput/index.vue";
import GithubOutputComponent from "./../githubOutput/index.vue";

export default {
  name: "githubApp",
  components: {
    "github-header": GithubHeaderComponent,
    "github-login": GithubLoginComponent,
    "github-input": GithubInputComponent,
    "github-output": GithubOutputComponent
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
        this.loginVisible = "none";
        this.contenVisbile = "block";
      } else {
        this.loginVisible = "flex";
        this.contenVisbile = "none";
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