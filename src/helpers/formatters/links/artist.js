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
    path:
      `artists/${artistNameEncoded}`
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
    path:
      `artists/${artistNameEncoded}/images`
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
    path:
      `artists/${artistNameEncoded}/tracks`
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
    path:
      `artists/${artistNameEncoded}/albums`
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
    path:
      `artists/${artistNameEncoded}/similar`
  }
}
