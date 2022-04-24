export default {
  provide () {
    return {
      getData: this.getData
    }
  },
  methods: {
    handleCall () {
      this.getData()
    },
    handleLinkClick () {
      this.hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
