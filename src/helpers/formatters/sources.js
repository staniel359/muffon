import audioSources from '@/helpers/data/audio/sources'

export function streamable () {
  return audioSources.filter(
    isSourceStreamable
  )
}

function isSourceStreamable (
  sourceData
) {
  return sourceData.isStreamable
}

export function otherWithAlbums () {
  return other().filter(
    isSourceWithAlbums
  )
}

function other () {
  return audioSources.filter(
    isSourceNotStreamable
  )
}

function isSourceNotStreamable (
  sourceData
) {
  return !sourceData.isStreamable
}

function isSourceWithAlbums (
  sourceData
) {
  return sourceData.isWithAlbums
}

export function otherWithTracks () {
  return other().filter(
    isSourceWithTracks
  )
}

function isSourceWithTracks (
  sourceData
) {
  return sourceData.isWithTracks
}

export function allWithAlbums () {
  return audioSources.filter(
    isSourceWithAlbums
  )
}
