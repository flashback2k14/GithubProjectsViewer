export default {
  name: "githubProject",
  props: ["project"],
  data () {
    return {}
  },
  methods: {
    test () {
      alert(this.project.id);
    }
  }
}