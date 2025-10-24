import sources from '@/helpers/data/sources'

export const audio =
  sources.filter(
    isAudioSource
  )

export const audioMaxBitrateSorted =
  sortSourcesByMaxBitrate(
    audio
  )

export const withArtists =
  sources.filter(
    isSourceWithArtists
  )

export const withAlbums =
  sources.filter(
    isSourceWithAlbums
  )

export const withTracks =
  sources.filter(
    isSourceWithTracks
  )

export const withLyrics =
  sources.filter(
    isSourceWithLyrics
  )

const albumAudio =
  audio.filter(
    isSourceWithAlbums
  )

export const albumAudioMaxBitrateSorted =
  sortSourcesByMaxBitrate(
    albumAudio
  )

const nonAudio =
  sources.filter(
    isNonAudioSource
  )

export const albumNonAudio =
  nonAudio.filter(
    isSourceWithAlbums
  )

const trackAudio =
  audio.filter(
    isSourceWithTracks
  )

export const trackAudioMaxBitrateSorted =
  sortSourcesByMaxBitrate(
    trackAudio
  )

export const trackNonAudio =
  nonAudio.filter(
    isSourceWithTracks
  )

export const video =
  sources.filter(
    isVideoSource
  )

function isAudioSource (
  sourceData
) {
  return sourceData.isAudio
}

function isSourceWithArtists (
  sourceData
) {
  return sourceData.isWithArtists
}

function isSourceWithAlbums (
  sourceData
) {
  return sourceData.isWithAlbums
}

function isSourceWithTracks (
  sourceData
) {
  return sourceData.isWithTracks
}

function isSourceWithLyrics (
  sourceData
) {
  return sourceData.isWithLyrics
}

function isNonAudioSource (
  sourceData
) {
  return !sourceData.isAudio
}

function isVideoSource (
  sourceData
) {
  return sourceData.isVideo
}

function sortSourcesByMaxBitrate (
  sources
) {
  return [
    ...sources
  ].sort(
    (
      firstItemData,
      secondItemData
    ) => {
      if (firstItemData.maxBitrate < secondItemData.maxBitrate) {
        return 1
      } else if (firstItemData.maxBitrate > secondItemData.maxBitrate) {
        return -1
      } else {
        if (firstItemData.name < secondItemData.name) {
          return -1
        } else {
          return 1
        }
      }
    }
  )
}
