export default {
  name: "ghpProjectItem",
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