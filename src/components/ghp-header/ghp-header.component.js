import bus from "./../../helper/bus";
import StorageHelper from "./../../helper/storage.helper";

export default {
  name: "ghpHeader",
  data () {
    return {
      title: "Github Projects Viewer"
    }
  },
  methods: {
    logout () {
      bus.$emit("show-snackbar", "Logging out...", false);
      bus.$emit("clear-search");
      bus.$emit("clear-content");
      StorageHelper.remove(StorageHelper.Keys.USER);
      StorageHelper.remove(StorageHelper.Keys.PW);
      bus.$emit("should-viewstate-changed", false);
    }
  }
}