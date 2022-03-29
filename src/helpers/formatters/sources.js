import audioSources from '*/helpers/data/audio/sources'
import { collection as formatCollection } from '*/helpers/formatters'

const streamable = () => {
  return audioSources.filter(sourceData => {
    return sourceData.isStreamable
  })
}

export const streamableCollection = () => {
  return formatCollection(
    streamable()
  )
}

const other = () => {
  return audioSources.filter(sourceData => {
    return !sourceData.isStreamable
  })
}

const otherCollection = () => {
  return formatCollection(
    other()
  )
}

export const otherWithAlbumsCollection = () => {
  return otherCollection().filter(sourceData => {
    return sourceData.isWithAlbums
  })
}

export const otherWithTracksCollection = () => {
  return otherCollection().filter(sourceData => {
    return sourceData.isWithTracks
  })
}

export const allWithAlbumsCollection = () => {
  return audioSources.filter(sourceData => {
    return sourceData.isWithAlbums
  })
}
