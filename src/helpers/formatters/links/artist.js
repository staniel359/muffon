export const main = ({ artistName }) => {
  return {
    name: 'ArtistMainPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName)
    ].join('/')
  }
}

export const images = ({ artistName }) => {
  return {
    name: 'ArtistImagesPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'images'
    ].join('/')
  }
}

export const tracks = ({ artistName }) => {
  return {
    name: 'ArtistTracksPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'tracks'
    ].join('/')
  }
}

export const albums = ({ artistName }) => {
  return {
    name: 'ArtistAlbumsPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'albums'
    ].join('/')
  }
}

export const similar = ({ artistName }) => {
  return {
    name: 'ArtistSimilarPage',
    params: { artistName },
    path: [
      'artists',
      encodeURIComponent(artistName),
      'similar'
    ].join('/')
  }
}
