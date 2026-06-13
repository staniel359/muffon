export default {
  props: {
    isActive: Boolean,
    isActivated: Boolean
  },
  emits: [
    'focus'
  ],
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
    refresh () {
      this.$refs
        .tab
        .refresh()
    }
  }
}
