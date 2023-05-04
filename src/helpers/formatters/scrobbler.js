export function track (
  {
    trackData
  }
) {
  const {
    title,
    duration
  } = trackData

  const artistName =
    trackData.artist.name

  const albumTitle =
    trackData.album?.title

  return {
    title,
    artistName,
    albumTitle,
    duration
  }
}
