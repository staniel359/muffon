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
    source,
    albumId,
    artistId,
    slug,
    artistSlug,
    albumType,
    model,
    ownerId,
    accessKey
  } = sourceParams

  const query = {
    source,
    album_id: albumId,
    artist_id: artistId,
    slug,
    artist_slug: artistSlug,
    album_type: albumType,
    model,
    owner_id: ownerId,
    access_key: accessKey
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

  const path =
    `artists/${artistNameEncoded}` +
    `/albums/${albumTitleEncoded}` +
    `?${queryString}`

  return {
    name: 'AlbumMainPage',
    params: {
      artistName,
      albumTitle
    },
    path,
    query: queryFiltered
  }
}
