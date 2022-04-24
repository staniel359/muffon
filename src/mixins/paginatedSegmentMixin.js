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
    }
  }
}
