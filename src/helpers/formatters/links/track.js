import formatQuery from '@/helpers/formatters/query'

export function main (
  {
    trackTitle,
    artistName,
    sourceParams = {}
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

  const params = {
    artistName:
      artistNameEncoded,
    trackTitle:
      trackTitleEncoded
  }

  const {
    source,
    trackId,
    artistId,
    albumId
  } = sourceParams

  const query = {
    source,
    track_id: trackId,
    artist_id: artistId,
    album_id: albumId
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
    name: 'TrackPage',
    params,
    path,
    query:
      queryFormatted.data
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

  const params = {
    artistName:
      artistNameEncoded,
    trackTitle:
      trackTitleEncoded
  }

  const path =
    `artists/${artistNameEncoded}` +
    `/tracks/${trackTitleEncoded}` +
    '/similar'

  return {
    name: 'TrackSimilarPage',
    params,
    path
  }
}

export function albums (
  {
    trackTitle,
    artistName,
    sourceParams = {}
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

  const params = {
    artistName:
      artistNameEncoded,
    trackTitle:
      trackTitleEncoded
  }

  const {
    source,
    trackId,
    artistId,
    albumId
  } = sourceParams

  const query = {
    source,
    track_id: trackId,
    artist_id: artistId,
    album_id: albumId
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
    `/albums?${queryFormatted.string}`

  return {
    name: 'TrackAlbumsPage',
    params,
    path,
    query:
      queryFormatted.data
  }
}

export function lyrics (
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

  const params = {
    artistName:
      artistNameEncoded,
    trackTitle:
      trackTitleEncoded
  }

  const {
    source,
    trackId
  } = sourceParams

  const query = {
    source,
    track_id: trackId
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
    `/lyrics?${queryFormatted.string}`

  return {
    name: 'TrackLyricsPage',
    params,
    path,
    query:
      queryFormatted.data
  }
}
