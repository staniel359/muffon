import {
  createStore
} from 'vuex'
import audio from '@/helpers/data/plugins/store/modules/audio'
import layout from '@/helpers/data/plugins/store/modules/layout'
import player from '@/helpers/data/plugins/store/modules/player'
import profile from '@/helpers/data/plugins/store/modules/profile'
import queue from '@/helpers/data/plugins/store/modules/queue'
import recommendations
  from '@/helpers/data/plugins/store/modules/recommendations'
import search from '@/helpers/data/plugins/store/modules/search'
import sidebar from '@/helpers/data/plugins/store/modules/sidebar'
import top from '@/helpers/data/plugins/store/modules/top'
import video from '@/helpers/data/plugins/store/modules/video'

export default createStore(
  {
    modules: {
      audio,
      layout,
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
