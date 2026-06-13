import {
  generateKey
} from '@/helpers/utils'

export default {
  inject: {
    getData: {
      default: () => false
    }
  },
  data () {
    return {
      responseDataComputed: null,
      refreshKey: null
    }
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    }
  },
  methods: {
    async handleResponseDataChange (
      value
    ) {
      await this.$nextTick()

      this.responseDataComputed = value

      if (this.isActivated) {
        this.setFocusable()
      }
    },
    async refresh () {
      this.reset()

      this.getData()

      await this.$nextTick()

      this.setFocusable()
    },
    reset () {
      this.responseDataComputed = null

      this.refreshKey = generateKey()
    },
    setFocusable () {
      this.$refs
        .pagination
        .setFocusable()
    }
  }
}
