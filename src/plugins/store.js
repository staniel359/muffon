import {
  createStore
} from 'vuex'
import audio from '*/helpers/data/plugins/store/modules/audio'
import layout from '*/helpers/data/plugins/store/modules/layout'
import player from '*/helpers/data/plugins/store/modules/player'
import profile from '*/helpers/data/plugins/store/modules/profile'
import recommendations
  from '*/helpers/data/plugins/store/modules/recommendations'
import queue from '*/helpers/data/plugins/store/modules/queue'

export default createStore(
  {
    modules: {
      audio,
      layout,
      player,
      profile,
      recommendations,
      queue
    }
  }
)
