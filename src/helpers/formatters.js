import store from '*/plugins/store'
import {
  generateKey
} from '*/helpers/utils'

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
  const date = new Date(
    value * 1000
  )

  return date
    .toISOString()
    .substr(
      14,
      5
    )
}

export function stringToDate (
  value
) {
  if (value) {
    const day = value.getDate()
    const month = value.getMonth()
    const year = value.getFullYear()

    const utcDate = Date.UTC(
      year,
      month,
      day
    )

    const date = new Date(
      utcDate
    )

    return date
      .toISOString()
      .substr(
        0,
        10
      )
  }
}

export function date (
  value
) {
  const {
    language
  } = store.state.profile

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  const date = new Date(
    value
  )

  return date
    .toLocaleDateString(
      language,
      options
    )
}

export function time (
  value
) {
  const date = new Date(
    value
  )

  return date
    .toString()
    .substr(
      16,
      8
    )
}

export function age (
  value
) {
  const ageInMilliseconds = (
    new Date() -
      new Date(
        value
      )
  )

  const ageInDatetime =
    new Date(
      ageInMilliseconds
    )

  return Math.abs(
    ageInDatetime.getUTCFullYear() - 1970
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
    return (
      new Date(
        second.created
      ) -
      new Date(
        first.created
      )
    )
  }

  return tracks.sort(
    sortTracks
  )
}
