import bus from "./../helper/bus.js";

export default {
  name: "githubInput",
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