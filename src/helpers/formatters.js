import dayjs from 'dayjs'
import profileStore from '@/stores/profile'
import {
  generateKey,
  sortByCreated
} from '@/helpers/utils'
import timezonesList from '@/helpers/data/timezones'
import {
  currentTime as formatCurrentTime
} from '@/helpers/formatters/dateTimeString'
import {
  kebabCase
} from 'change-case'

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

  const languageFormatted =
    kebabCase(
      language
    )

  return value.toLocaleString(
    languageFormatted
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
  value,
  {
    isWithCreated
  } = {}
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
  } = {
    ...value
  }

  const audioData = {
    present: audio.present
  }

  const created =
    formatCurrentTime()

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
    audio: audioData,
    ...(isWithCreated && {
      created
    })
  }
}

export function timezones () {
  function formatTimezone (
    name
  ) {
    return {
      id: name,
      name
    }
  }

  return timezonesList.map(
    formatTimezone
  )
}

export function calendarData (
  {
    startDate
  }
) {
  const days =
    dayjs.weekdaysShort()

  const months = dayjs.months()

  const monthsShort =
    dayjs.monthsShort()

  const minDate =
    dayjs().subtract(
      100,
      'year'
    ).toDate()

  const maxDate = dayjs().toDate()

  const initialDate = (
    startDate &&
      dayjs(
        startDate
      ).toDate()
  )

  return {
    days,
    months,
    monthsShort,
    minDate,
    maxDate,
    initialDate
  }
}

export function maxBitrate (
  value
) {
  return `≤ ${value}`
}
