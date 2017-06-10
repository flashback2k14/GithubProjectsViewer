import bus from "./../../../helper/bus.js";

export default {
  name: "ghpSnackbar",
  data () {
    return {
      message: ""
    };
  },
  created () {
    bus.$on("show-snackbar", this._showSnackbar);
  },
  destroyed () {
    bus.$off("show-snackbar", this._showSnackbar);
  },
  methods: {
    _showSnackbar(msg, isError = true) {
      // set message
      this.message = msg;
      // get div element
      const elSnackbar = this.$refs.snackbar;
      // evaluate div element color
      const elColorClass = isError ? "snackbar-colors_error" : "snackbar-colors_info";
      // set div element color
      elSnackbar.classList.add(elColorClass);
      // show div element
      elSnackbar.classList.add("snackbar-show");
      // remove div element after 4 seconds
      setTimeout(() => { 
        elSnackbar.classList.remove("snackbar-show", elColorClass);
        this.message = "";
      }, 4000);
    }
  }
}