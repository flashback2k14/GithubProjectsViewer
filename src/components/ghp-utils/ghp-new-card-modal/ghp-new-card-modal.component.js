export default {
  name: "ghpNewCardModal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalTitle: String,
    modalType: String,
    onClose: Function
  },
  data () {
    return {
      note: ""
    };
  },
  created () {
    this._addListener();
  },
  destroyed () {
    this._removeListener();
  },
  methods: {
    close () {
      this.onClose();
      this.note = "";
    },
    save () {
      this.onClose(this.note, modalType);
      this.note = "";
    },
    _closeByKey (e) {
      if (this.show && e.keyCode === 27) {
        this.close();
      }
    },
    _addListener () {
      document.addEventListener("keydown", this._closeByKey);
    },
    _removeListener () {
      document.removeEventListener("keydown", this._closeByKey);
    }
  }
}