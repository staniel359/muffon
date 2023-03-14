export default {
  props: {
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
