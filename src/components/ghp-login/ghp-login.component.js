import bus from "./../../helper/bus";
import StorageHelper from "./../../helper/storage.helper";

export default {
  name: "ghpLogin",
  data () {
    return {
      login: {
        username: "",
        password: ""
      }
    }
  },
  created () {
    let username = StorageHelper.get(StorageHelper.Keys.USER);
    let password = StorageHelper.get(StorageHelper.Keys.PW);

    if (username && password) {
      bus.$emit("should-viewstate-changed", true);
    } else {
      bus.$emit("should-viewstate-changed", false);
    }
  },
  methods: {
    onSubmit (event) {
      if (this.login.username && this.login.password) {
        StorageHelper.set(StorageHelper.Keys.USER, btoa(this.login.username));
        StorageHelper.set(StorageHelper.Keys.PW, btoa(this.login.password));
        this.login.username = "";
        this.login.password = "";
        bus.$emit("should-viewstate-changed", true);
      }
    }
  }
}