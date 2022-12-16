import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      country: null
    }
  },
  actions: {
    setCountry (
      value
    ) {
      this.country = value
    }
  }
}

export default defineStore(
  'top',
  data
)
