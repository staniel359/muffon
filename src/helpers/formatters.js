import store from '*/plugins/store'
import {
  generateKey
} from '*/helpers/utils'
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
  return value.toLocaleString(
    'eu'
  )
}

export function seconds (
  value
) {
  return moment(
    value * 1000
  ).format(
    'mm:ss'
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
  } = store.state.profile

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
  } = store.state.profile

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

  function sortTracks (
    first,
    second
  ) {
    const firstCreated =
      moment(
        first.created
      ).toDate()

    const secondCreated =
      moment(
        second.created
      ).toDate()

    return (
      secondCreated -
        firstCreated
    )
  }

  return tracks.sort(
    sortTracks
  )
}
