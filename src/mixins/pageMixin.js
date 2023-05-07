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
      this.refreshKey = generateKey()
    }
  }
}
