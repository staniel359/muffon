export default {
  provide () {
    return {
      setViewId: this.setViewId
    }
  },
  data () {
    return {
      listScope: null,
      defaultViewId: 'table',
      viewId: 'table'
    }
  },
  computed: {
    limit () {
      return this.scopeViewLimitsData[
        this.viewId
      ].large
    },
    scopeViewLimitsData () {
      return this.viewLimitsData[
        this.viewScope
      ]
    },
    viewLimitsData () {
      return require(
        '@/helpers/data/limits'
      )
    },
    viewScope () {
      return (
        this.listScope ||
          this.scope
      )
    }
  },
  methods: {
    setViewId (
      value
    ) {
      this.viewId = value
    },
    resetViewId () {
      this.viewId =
        this.defaultViewId
    }
  }
}
