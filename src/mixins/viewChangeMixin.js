export default {
  provide () {
    return {
      setViewIndex: this.setViewIndex
    }
  },
  data () {
    return {
      viewIndex: 1,
      viewLimits: [50, 20, 10]
    }
  },
  computed: {
    limit () {
      return this.viewLimits[
        this.viewIndex
      ]
    }
  },
  methods: {
    setViewIndex (value) {
      this.viewIndex = value
    }
  }
}
