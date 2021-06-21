import audioSources from '#/data/audio/sources'

export const getStreamable = bool => {
  const isStreamableSource = sourceData => {
    return sourceData.isStreamable === bool
  }

  return audioSources.filter(
    isStreamableSource
  )
}
