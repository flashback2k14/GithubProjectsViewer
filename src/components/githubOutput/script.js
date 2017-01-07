import bus from "./../helper/bus.js";
import FetchHelper from "./../helper/fetchHelper";
import StorageHelper from "./../helper/storageHelper";
import GithubProjectComponent from "./../githubProject/index.vue";

export default {
  name: "githubOutput",
  components: {
    "github-project": GithubProjectComponent
  },
  data () {
    return {
      currentSearchInput: {},
      githubProjectsKey: "",
      githubProjects: {}
    }
  },
  created () {
    bus.$on("search-changed", this.onSearchChanged);
  },
  destroyed () {
    bus.$off("search-changed", this.onSearchChanged);
  },
  methods: {
    onSearchChanged (searchInput) {
      if (searchInput) {
        this.currentSearchInput = searchInput;
        this.githubProjectsKey = JSON.stringify(searchInput);
        this.fetchData(searchInput);
      } else {
        this.currentSearchInput = null;
      }
    },
    fetchData (search) {
      if (this.githubProjects.hasOwnProperty(this.githubProjectsKey)) return;
      
      const fh = new FetchHelper(StorageHelper.get(StorageHelper.Keys.USER), 
                                  StorageHelper.get(StorageHelper.Keys.PW));

      fetch(fh.getAllProjectsUrl(search.username, search.repo), {
        method: "GET",
        headers: fh.getHeader()
      })
      .then(r => r.json())
      .then(data => {
        this.$set(this.githubProjects, this.githubProjectsKey, data);
      })
      .catch(error => console.error(error));
    }
  }
}