import profileStore from '@/stores/profile'
import {
  generateKey,
  sortByCreated
} from '@/helpers/utils'
import moment from 'moment-timezone'

export function collection (
  value
) {
  function formatCollectionItemData (
    item
  ) {
    const isString =
      typeof item === 'string'

    const isNumber =
      typeof item === 'number'

    if (isString || isNumber) {
      return {
        name: item
      }
    } else {
      return item
    }
  }

  function formatCollectionItem (
    item
  ) {
    return {
      uuid: generateKey(),
      ...formatCollectionItemData(
        item
      )
    }
  }

  return [
    ...value
  ].map(
    formatCollectionItem
  )
}

export function number (
  value
) {
  const {
    language
  } = profileStore()

  return value.toLocaleString(
    language
  )
}

export function seconds (
  value
) {
  const isWithHours = (
    value >= 3600
  )

  const format = isWithHours
    ? 'H:mm:ss'
    : 'mm:ss'

  return moment.utc(
    value * 1000
  ).format(
    format
  )
}

export function stringToDate (
  value
) {
  if (value) {
    return moment(
      value
    ).format(
      'YYYY-MM-DD'
    )
  } else {
    return null
  }
}

export function date (
  value
) {
  const {
    timezone,
    language
  } = profileStore()

  return moment.utc(
    value
  ).tz(
    timezone
  ).locale(
    language
  ).format(
    'll'
  )
}

export function time (
  value
) {
  const {
    timezone
  } = profileStore()

  return moment.utc(
    value
  ).tz(
    timezone
  ).format(
    'HH:mm:ss'
  )
}

export function age (
  value
) {
  return moment().diff(
    value,
    'years'
  )
}

export function playsToTracks (
  value
) {
  function formatPlay (
    playData
  ) {
    const playId = [
      playData.title,
      playData.artist.name,
      playData.album?.title
    ].filter(
      e => e
    ).join(
      ':'
    )

    return [
      playId,
      {
        uuid: generateKey(),
        ...playData
      }
    ]
  }

  const playsFormatted =
    value.map(
      formatPlay
    )

  const tracks = [
    ...new Map(
      playsFormatted
    ).values()
  ]

  return sortByCreated(
    {
      collection: tracks,
      order: 'createdDesc'
    }
  )
}

export function playing (
  value
) {
  const {
    source,
    title,
    artist,
    artists,
    album,
    image,
    duration,
    audio
  } = value

  return {
    source,
    player_id:
      value.player_id,
    title,
    artist,
    artists,
    album,
    image,
    duration,
    audio: {
      present: audio.present
    }
  }
}
