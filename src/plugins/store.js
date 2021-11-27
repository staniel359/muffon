import { createStore } from 'vuex'
import audio from '#/data/plugins/store/modules/audio'
import layout from '#/data/plugins/store/modules/layout'
import player from '#/data/plugins/store/modules/player'
import profile from '#/data/plugins/store/modules/profile'
import queue from '#/data/plugins/store/modules/queue'

export default createStore({
  modules: {
    audio,
    layout,
    player,
    profile,
    queue
  }
})
