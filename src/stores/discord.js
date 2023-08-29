import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      richPresenceButtons: null
    }
  },
  actions: {
    setRichPresenceButtons (
      value
    ) {
      this.richPresenceButtons = value
    }
  }
}

export default defineStore(
  'discord',
  data
)
