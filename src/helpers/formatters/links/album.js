export function main (
  {
    artistName,
    albumTitle,
    sourceParams
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  const albumTitleEncoded =
    encodeURIComponent(
      albumTitle
    )

  const {
    sourceId,
    albumId,
    artistId,
    album,
    artist,
    model,
    albumType,
    paramsData
  } = sourceParams

  function formatParamsDataString () {
    const isParamsData = Object.keys(
      paramsData || {}
    ).length

    if (isParamsData) {
      return JSON.stringify(
        paramsData
      )
    } else {
      return null
    }
  }

  const query = {
    source_id: sourceId,
    album_id: albumId,
    artist_id: artistId,
    album,
    artist,
    model,
    album_type: albumType,
    params_data: formatParamsDataString()
  }

  const queryFiltered =
    Object.fromEntries(
      Object.entries(
        query
      ).filter(
        a => a[1]
      )
    )

  const queryString =
    new URLSearchParams(
      queryFiltered
    ).toString()

  return {
    name: 'AlbumMainPage',
    params: {
      artistName,
      albumTitle
    },
    path:
      `artists/${artistNameEncoded}` +
      `/albums/${albumTitleEncoded}` +
      `?${queryString}`,
    query: queryFiltered
  }
}
