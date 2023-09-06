export function main (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  const params = {
    artistName:
      artistNameEncoded
  }

  const path =
    `artists/${artistNameEncoded}`

  return {
    name: 'ArtistPage',
    params,
    path
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

  const params = {
    artistName:
      artistNameEncoded
  }

  const path =
    `artists/${artistNameEncoded}/images`

  return {
    name: 'ArtistImagesPage',
    params,
    path
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

  const params = {
    artistName:
      artistNameEncoded
  }

  const path =
    `artists/${artistNameEncoded}/tracks`

  return {
    name: 'ArtistTracksPage',
    params,
    path
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

  const params = {
    artistName:
      artistNameEncoded
  }

  const path =
    `artists/${artistNameEncoded}/albums`

  return {
    name: 'ArtistAlbumsPage',
    params,
    path
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

  const params = {
    artistName:
      artistNameEncoded
  }

  const path =
    `artists/${artistNameEncoded}/similar`

  return {
    name: 'ArtistSimilarPage',
    params,
    path
  }
}

export function shows (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  const params = {
    artistName:
      artistNameEncoded
  }

  const path =
    `artists/${artistNameEncoded}/shows`

  return {
    name: 'ArtistShowsPage',
    params,
    path
  }
}
