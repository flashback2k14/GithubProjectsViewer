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
  methods: {
    onSubmit (event) {
      if (this.search.username && this.search.repo) {
        bus.$emit("search-changed", this.search);
      } else {
        bus.$emit("search-changed", null);
      }
    }
  }
}