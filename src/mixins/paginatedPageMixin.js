export default {
  provide () {
    return {
      getData: this.getData
    }
  },
  methods: {
    handleFocus () {
      this.focus()
    },
    getData (
      {
        page
      } = {}
    ) {
      this.$refs
        .page
        .getData(
          {
            page
          }
        )
    },
    focus () {
      this.$refs
        .pagination
        .focus()
    },
    reset () {
      this.$refs
        .pagination
        ?.reset()
    }
  }
}
