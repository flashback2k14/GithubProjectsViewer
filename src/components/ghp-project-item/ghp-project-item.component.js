import ShowdownHelper from "./../../helper/showdown.helper";
import bus from "./../../helper/bus";

export default {
  name: "ghpProjectItem",
  props: ["project"],
  data () {
    return {}
  },
  computed: {
    mdBody: function () {
      return ShowdownHelper.convertMdToHtml(this.project.body);
    }
  },
  methods: {
    showProjectColumns () {
      bus.$emit("show-project-columns", this.project.id);
    }
  }
}