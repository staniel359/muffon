export function main (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  return {
    name: 'ArtistPage',
    params: {
      artistName
    },
    path: [
      'artists',
      artistNameEncoded
    ].join(
      '/'
    )
  }
}

export function images (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  return {
    name: 'ArtistImagesPage',
    params: {
      artistName
    },
    path: [
      'artists',
      artistNameEncoded,
      'images'
    ].join(
      '/'
    )
  }
}

export function tracks (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  return {
    name: 'ArtistTracksPage',
    params: {
      artistName
    },
    path: [
      'artists',
      artistNameEncoded,
      'tracks'
    ].join(
      '/'
    )
  }
}

export function albums (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  return {
    name: 'ArtistAlbumsPage',
    params: {
      artistName
    },
    path: [
      'artists',
      artistNameEncoded,
      'albums'
    ].join(
      '/'
    )
  }
}

export function similar (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  return {
    name: 'ArtistSimilarPage',
    params: {
      artistName
    },
    path: [
      'artists',
      artistNameEncoded,
      'similar'
    ].join(
      '/'
    )
  }
}
