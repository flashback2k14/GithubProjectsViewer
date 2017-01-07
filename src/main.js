import Vue from "vue";
import GithubAppComponent from "./components/githubApp/index.vue";

const vm = new Vue({
  el: "#app",
  components: {
    app: GithubAppComponent
  },
  render: h => h("app")
});