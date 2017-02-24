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
      StorageHelper.remove(StorageHelper.Keys.USER);
      StorageHelper.remove(StorageHelper.Keys.PW);
      StorageHelper.remove(StorageHelper.Keys.SEARCHUSER);
      StorageHelper.remove(StorageHelper.Keys.SEARCHREPO);
      bus.$emit("should-viewstate-changed", false);
    }
  }
}