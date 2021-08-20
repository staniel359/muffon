import { generateKey } from '#/utils'

export const collection = collection => {
  const formatCollectionItemData = item => {
    const isString = typeof item === 'string'

    if (isString) {
      return { name: item }
    } else {
      return item
    }
  }

  const formatCollectionItem = item => {
    return {
      uuid: generateKey(),
      ...formatCollectionItemData(item)
    }
  }

  return [...collection].map(
    formatCollectionItem
  )
}

export const number = value => {
  return value.toLocaleString('eu')
}

export const seconds = value => {
  return new Date(value * 1000)
    .toISOString()
    .substr(14, 5)
}

export const stringToDate = value => {
  if (value) {
    const day = value.getDate()
    const month = value.getMonth()
    const year = value.getFullYear()

    const utcDate = Date.UTC(
      year, month, day
    )

    return new Date(utcDate)
      .toISOString()
      .substr(0, 10)
  }
}

export const date = date => {
  return new Date(date)
    .toString()
    .substr(4, 11)
}

export const time = date => {
  return new Date(date)
    .toString()
    .substr(16, 8)
}

export const age = birthdate => {
  const yearsInSecondsFromNow =
    new Date() -
      new Date(birthdate)
  const yearsInSeconds =
    1000 * 60 * 60 * 24 * 365

  return Math.floor(
    yearsInSecondsFromNow /
      yearsInSeconds
  )
}

export const playsToTracks = plays => {
  const formatPlay = playData => {
    const playId = [
      playData.title,
      playData.artist.name,
      playData.album.title
    ].filter(e => e).join(':')

    return [
      playId,
      playData
    ]
  }

  const playsFormatted = plays.map(
    formatPlay
  )

  const tracks = [...new Map(
    playsFormatted
  ).values()]

  const tracksSorted = tracks.sort((a, b) => {
    return (
      new Date(b.created) -
        new Date(a.created)
    )
  })

  return tracksSorted
}
