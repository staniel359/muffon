import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      isWithAnnotations: null
    }
  },
  actions: {
    setIsWithAnnotations (
      value
    ) {
      this.isWithAnnotations = value
    }
  }
}

export default defineStore(
  'lyrics',
  data
)
