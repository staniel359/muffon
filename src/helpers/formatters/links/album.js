import formatQuery from '@/helpers/formatters/query'

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

  const queryFormatted =
    formatQuery(
      {
        query
      }
    )

  const path =
    `artists/${artistNameEncoded}` +
    `/albums/${albumTitleEncoded}` +
    `?${queryFormatted.string}`

  return {
    name: 'AlbumMainPage',
    params: {
      artistName,
      albumTitle
    },
    path,
    query: queryFormatted.data
  }
}
