export default {
  name: "ghpProjectColumn",
  props: ["column"],
  data () {
    return {}
  },
  methods: {
    test () {
      alert(this.column.id);
    }
  }
}