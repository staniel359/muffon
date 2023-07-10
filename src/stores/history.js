import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      librarySearch: null,
      search: null
    }
  },
  actions: {
    setLibrarySearch (
      value
    ) {
      this.librarySearch = value
    },
    setSearch (
      value
    ) {
      this.search = value
    }
  }
}

export default defineStore(
  'history',
  data
)
