export default function (
  {
    trackData,
    artistName,
    scope
  }
) {
  const source = (
    trackData.source?.name ||
      'lastfm'
  )

  function formatTrackData () {
    switch (source) {
      case 'lastfm':
        return {
          artistName: (
            trackData.artist?.name ||
              trackData.artistName ||
              artistName
          ),
          trackTitle: (
            trackData.title ||
              trackData.trackTitle
          )
        }
      case 'bandcamp':
        return {
          trackId: trackData.source.id,
          artistId:
            trackData.source.artist_id
        }
      default:
        return {
          trackId: trackData.source.id
        }
    }
  }

  return {
    source,
    scope,
    ...formatTrackData()
  }
}
