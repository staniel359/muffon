import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      librarySearch: null,
      savedTracksSearch: null,
      search: null
    }
  },
  actions: {
    setLibrarySearch (
      value
    ) {
      this.librarySearch = value
    },
    setSavedTracksSearch (
      value
    ) {
      this.savedTracksSearch = value
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
