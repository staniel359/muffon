import { createStore } from 'vuex'
import layout from './store/modules/layout'
import audio from './store/modules/audio'
import player from './store/modules/player'
import queue from './store/modules/queue'

export default createStore({
  modules: {
    layout,
    audio,
    player,
    queue
  }
})
