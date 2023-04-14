import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      source: 'lastfm',
      scope: 'artists'
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
