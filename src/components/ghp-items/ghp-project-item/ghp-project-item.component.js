import bus from "./../../../helper/bus";
import ShowdownHelper from "./../../../helper/showdown.helper";

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