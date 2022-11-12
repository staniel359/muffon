export default {
  provide () {
    return {
      setOrder: this.setOrder
    }
  },
  methods: {
    setOrder (
      value
    ) {
      this.order = value
    }
  }
}
