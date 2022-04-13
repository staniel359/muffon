export function main (
  {
    artistName,
    trackTitle,
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
    sourceId,
    trackId,
    artistId,
    track,
    artist
  } = sourceParams

  const query = {
    source_id: sourceId,
    track_id: trackId,
    artist_id: artistId,
    track,
    artist
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
