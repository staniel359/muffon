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
      case 'amazonmusic':
        return {
          trackId: trackData.source.id,
          albumId:
            trackData.source.album_id
        }
      case 'bandcamp':
        return {
          trackId: trackData.source.id,
          artistId:
            trackData.source.artist_id
        }
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
