import showdown from "showdown";

export default {
  name: "ghpProjectItem",
  props: ["project"],
  computed: {
    mdBody: function () {
      return new showdown.Converter().makeHtml(this.project.body);
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