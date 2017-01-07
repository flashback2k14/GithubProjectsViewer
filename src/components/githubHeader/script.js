import bus from "./../helper/bus";
import StorageHelper from "./../helper/storageHelper";

export default {
  name: "githubHeader",
  data () {
    return {
      title: "Github Projects built with Vue.js"
    }
  },
  methods: {
    logout () {
      StorageHelper.remove(StorageHelper.Keys.USER);
      StorageHelper.remove(StorageHelper.Keys.PW);
      bus.$emit("should-viewstate-changed", false);
    }
  }
}