import MomentHelper from "./../../helper/moment.helper";
import bus from "./../../helper/bus";

export default {
  name: "ghpProjectColumn",
  props: ["column"],
  data () {
    return {}
  },
  filters: {
    formatDate: function (value) {
      if (!value) return "";
      return MomentHelper.convert(value);
    }
  },
  methods: {
    showColumnCards () {
      bus.$emit("show-column-cards", this.column.id);
    }
  }
}