import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      source: 'lastfm'
    }
  },
  actions: {
    setSource (
      value
    ) {
      this.source = value
    }
  }
}

export default defineStore(
  'search',
  data
)
