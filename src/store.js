import { createStore } from 'vuex'
import audio from './store/modules/audio'
import layout from './store/modules/layout'
import player from './store/modules/player'
import profile from './store/modules/profile'
import queue from './store/modules/queue'

export default createStore({
  modules: {
    audio,
    layout,
    player,
    profile,
    queue
  }
})
