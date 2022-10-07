import formatQuery from '@/helpers/formatters/query'

export function main (
  {
    trackTitle,
    artistName,
    sourceParams
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  const trackTitleEncoded =
    encodeURIComponent(
      trackTitle
    )

  const {
    source,
    trackId,
    artistId,
    slug,
    artistSlug
  } = sourceParams

  const query = {
    source,
    track_id: trackId,
    artist_id: artistId,
    slug,
    artist_slug: artistSlug
  }

  const queryFormatted =
    formatQuery(
      {
        query
      }
    )

  const path =
    `artists/${artistNameEncoded}` +
    `/tracks/${trackTitleEncoded}` +
    `?${queryFormatted.string}`

  return {
    name: 'TrackMainPage',
    params: {
      artistName,
      trackTitle
    },
    path,
    query: queryFormatted.data
  }
}

export function similar (
  {
    artistName,
    trackTitle
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  const trackTitleEncoded =
    encodeURIComponent(
      trackTitle
    )

  return {
    name: 'TrackSimilarPage',
    params: {
      artistName,
      trackTitle
    },
    path:
      `artists/${artistNameEncoded}` +
      `/tracks/${trackTitleEncoded}` +
      '/similar'
  }
}
