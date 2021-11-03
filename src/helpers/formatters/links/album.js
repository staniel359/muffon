export const main = ({ artistName, albumTitle, sourceParams }) => {
  const artistNameEncoded = encodeURIComponent(
    artistName
  )
  const albumTitleEncoded = encodeURIComponent(
    albumTitle
  )
  const {
    sourceId,
    albumId,
    artistId,
    model,
    paramsData
  } = sourceParams

  const paramsDataString = JSON.stringify(
    paramsData || {}
  )

  return {
    name: 'AlbumMainPage',
    params: { artistName, albumTitle },
    path:
      `artists/${artistNameEncoded}` +
      `/albums/${albumTitleEncoded}` +
      `?source_id=${sourceId}` +
      `&album_id=${albumId}` +
      `&artist_id=${artistId}` +
      `&model=${model}` +
      `&params_data=${paramsDataString}`,
    query: {
      source_id: sourceId,
      album_id: albumId,
      artist_id: artistId,
      model,
      params_data: paramsDataString
    }
  }
}
