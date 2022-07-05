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
    name: 'TrackMainPage',
    params: {
      artistName,
      trackTitle
    },
    path:
      `artists/${artistNameEncoded}` +
      `/tracks/${trackTitleEncoded}` +
      `?${queryString}`,
    query: queryFiltered
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
