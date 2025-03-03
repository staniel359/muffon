export default function (
  {
    tracks,
    query
  }
) {
  function isMatchedString (
    value
  ) {
    if (!value) {
      return false
    }

    const valueFormatted =
      value.toLowerCase()

    const queryFormatted =
      query.toLowerCase()

    return valueFormatted.includes(
      queryFormatted
    )
  }

  function isMatchedTrack (
    trackData
  ) {
    const trackTitle =
      trackData.title

    const artistName =
      trackData.artist.name

    const albumTitle =
      trackData.album?.title

    return (
      isMatchedString(
        trackTitle
      ) || isMatchedString(
        artistName
      ) || isMatchedString(
        albumTitle
      )
    )
  }

  return [
    ...tracks
  ].filter(
    isMatchedTrack
  )
}
