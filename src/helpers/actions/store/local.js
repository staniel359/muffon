import dayjs from 'dayjs'
import audioStore from '@/stores/audio'
import layoutStore from '@/stores/layout'
import lyricsStore from '@/stores/lyrics'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import recommendationsStore from '@/stores/recommendations'
import searchStore from '@/stores/search'
import sidebarStore from '@/stores/sidebar'
import topStore from '@/stores/top'
import videoStore from '@/stores/video'
import i18n from '@/plugins/i18n'
import {
  snakeCase
} from 'snake-case'
import {
  camelCase
} from 'camel-case'

const stores = {
  audio: audioStore,
  layout: layoutStore,
  lyrics: lyricsStore,
  player: playerStore,
  profile: profileStore,
  queue: queueStore,
  recommendations:
    recommendationsStore,
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
    i18n.global.locale = value

    dayjs.locale(
      value
    )
  }
}
