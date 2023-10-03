import audioStore from '@/stores/audio'
import discordStore from '@/stores/discord'
import historyStore from '@/stores/history'
import homePageStore from '@/stores/homePage'
import layoutStore from '@/stores/layout'
import lyricsStore from '@/stores/lyrics'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import recommendationArtistsStore from '@/stores/recommendationArtists'
import recommendationTracksStore from '@/stores/recommendationTracks'
import searchStore from '@/stores/search'
import sidebarStore from '@/stores/sidebar'
import topStore from '@/stores/top'
import videoStore from '@/stores/video'
import {
  snakeCase,
  camelCase
} from 'change-case'
import {
  change as changeLanguage
} from '@/helpers/actions/language'

const stores = {
  audio: audioStore,
  discord: discordStore,
  history: historyStore,
  homePage: homePageStore,
  layout: layoutStore,
  lyrics: lyricsStore,
  player: playerStore,
  profile: profileStore,
  queue: queueStore,
  recommendationArtists:
    recommendationArtistsStore,
  recommendationTracks:
    recommendationTracksStore,
  search: searchStore,
  sidebar: sidebarStore,
  top: topStore,
  video: videoStore
}

function getAction (
  {
    name,
    key
  }
) {
  const store = stores[name]

  if (store) {
    const keyFormatted =
      snakeCase(
        key
      )

    const actionName =
      camelCase(
        `set-${keyFormatted}`
      )

    return store()[
      actionName
    ]
  }
}

function callAction (
  {
    name,
    key,
    value
  }
) {
  const action =
    getAction(
      {
        name,
        key
      }
    )

  if (action) {
    action(
      value
    )
  }
}

export function update (
  nameWithKey,
  value
) {
  const [
    name,
    key
  ] = nameWithKey.split(
    '.'
  )

  callAction(
    {
      name,
      key,
      value
    }
  )

  const isChangeLanguage = (
    nameWithKey ===
      'profile.language'
  )

  if (isChangeLanguage) {
    changeLanguage(
      value
    )
  }
}
