import sources from '@/helpers/data/sources'

export const audio =
  sources.filter(
    isAudioSource
  )

const nonAudio =
  sources.filter(
    isNonAudioSource
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

export const albumAudio =
  audio.filter(
    isSourceWithAlbums
  )

export const albumNonAudio =
  nonAudio.filter(
    isSourceWithAlbums
  )

export const trackAudio =
  audio.filter(
    isSourceWithTracks
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
