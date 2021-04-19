import { toggleLoaderDimmer } from '#/actions/layout'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    isShowLoader () {
      return true
    }
  },
  watch: {
    isLoading: {
      immediate: true,
      handler: 'handleLoadingChange'
    }
  },
  methods: {
    handleLoadingChange (value) {
      toggleLoaderDimmer(
        this.isShowLoader && value
      )
    }
  }
}
