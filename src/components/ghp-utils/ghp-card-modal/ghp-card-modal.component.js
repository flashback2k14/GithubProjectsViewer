export default {
  name: "ghpCardModal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalTitle: String,
    modalType: String,
    modalNote: {
      type: String,
      default: ""
    },
    modalSaveButtonText: {
      type: String,
      default: "Save"
    },
    onClose: Function
  },
  computed: {
    note () {
      return this.modalNote;
    }
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
      this.onClose(this.$refs.taNote.value.trim(), this.modalType);
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