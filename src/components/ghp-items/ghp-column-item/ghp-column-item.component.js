import bus from "./../../../helper/bus";
import MomentHelper from "./../../../helper/moment.helper";

export default {
  name: "ghpColumnItem",
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