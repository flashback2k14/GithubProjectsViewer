import ShowdownHelper from "./../../helper/showdown.helper";

export default {
  name: "ghpProjectItem",
  props: ["project"],
  computed: {
    mdBody: function () {
      return ShowdownHelper.convertMdToHtml(this.project.body);
    }
  },
  data () {
    return {}
  },
  methods: {
    showProjectDetails () {
      alert(this.project.id);
    }
  }
}