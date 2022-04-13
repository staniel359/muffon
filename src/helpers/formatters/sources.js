import audioSources from '*/helpers/data/audio/sources'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export function streamableCollection () {
  return formatCollection(
    streamable()
  )
}

function streamable () {
  return audioSources.filter(
    isSourceStreamable
  )
}

function isSourceStreamable (
  sourceData
) {
  return sourceData.isStreamable
}

function otherCollection () {
  return formatCollection(
    other()
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

export function otherWithAlbumsCollection () {
  return otherCollection().filter(
    isSourceWithAlbums
  )
}

function isSourceWithAlbums (
  sourceData
) {
  return sourceData.isWithAlbums
}

export function otherWithTracksCollection () {
  return otherCollection().filter(
    isSourceWithTracks
  )
}

function isSourceWithTracks (
  sourceData
) {
  return sourceData.isWithTracks
}

export function allWithAlbumsCollection () {
  return audioSources.filter(
    isSourceWithAlbums
  )
}
