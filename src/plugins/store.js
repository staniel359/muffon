import {
  createStore
} from 'vuex'
import audio from './store/modules/audio'
import layout from './store/modules/layout'
import lyrics from './store/modules/lyrics'
import player from './store/modules/player'
import profile from './store/modules/profile'
import queue from './store/modules/queue'
import recommendations from './store/modules/recommendations'
import search from './store/modules/search'
import sidebar from './store/modules/sidebar'
import top from './store/modules/top'
import video from './store/modules/video'

export default createStore(
  {
    modules: {
      audio,
      layout,
      lyrics,
      player,
      profile,
      queue,
      recommendations,
      search,
      sidebar,
      top,
      video
    }
  }
)
