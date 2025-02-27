import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      librarySearch: null,
      savedTracksSearch: null,
      search: null,
      isSaveBrowser: null,
      isSavePlayer: null
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
    },
    setIsSaveBrowser (
      value
    ) {
      this.isSaveBrowser = value
    },
    setIsSavePlayer (
      value
    ) {
      this.isSavePlayer = value
    }
  }
}

export default defineStore(
  'history',
  data
)
