import {
  generateKey
} from '@/helpers/utils'

export default {
  data () {
    return {
      refreshKey: null
    }
  },
  methods: {
    refresh () {
      this.resetData()

      this.refreshKey = generateKey()
    },
    resetData () {
      const initialData =
        this.$options
          .data
          .apply(
            this
          )

      Object.assign(
        this.$data,
        initialData
      )
    }
  }
}
