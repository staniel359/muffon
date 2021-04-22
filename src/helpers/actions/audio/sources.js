import audioSources from '#/data/audio/sources'

export function getStreamable (bool) {
  return audioSources.filter(source => {
    return !!source.isStreamable === bool
  })
}
