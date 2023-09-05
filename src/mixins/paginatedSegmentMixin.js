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
    handleRefresh () {
      this.refresh()
    },
    getData (
      {
        page
      } = {}
    ) {
      this.$refs
        .segment
        .getData(
          {
            page
          }
        )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    },
    refresh () {
      this.$refs
        .segment
        ?.refresh()
    }
  }
}
