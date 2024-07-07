export default {
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    isWithTopSecondSegment: Boolean,
    isWithPlayButton: Boolean
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
    },
    refresh () {
      this.$refs
        .pagination
        ?.refresh()
    }
  }
}
