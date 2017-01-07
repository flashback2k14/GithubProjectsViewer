import Vue from "vue";
import GhpApp from "./components/ghp-app/ghp-app.component.vue";

const vm = new Vue({
  el: "#app",
  components: {
    app: GhpApp
  },
  render: h => h("app")
});