import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      source: null,
      scope: null
    }
  },
  actions: {
    setSource (
      value
    ) {
      this.source = value
    },
    setScope (
      value
    ) {
      this.scope = value
    }
  }
}

export default defineStore(
  'search',
  data
)
