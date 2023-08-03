import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      source: null,
      scope: null,
      isResultsFullSize: null
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
    },
    setIsResultsFullSize (
      value
    ) {
      this.isResultsFullSize = value
    }
  }
}

export default defineStore(
  'search',
  data
)
