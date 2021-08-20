export const main = ({ tagName }) => {
  return {
    name: 'TagMainPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName)
    ].join('/')
  }
}

export const artists = ({ tagName }) => {
  return {
    name: 'TagArtistsPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName),
      'artists'
    ].join('/')
  }
}

export const albums = ({ tagName }) => {
  return {
    name: 'TagAlbumsPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName),
      'albums'
    ].join('/')
  }
}

export const tracks = ({ tagName }) => {
  return {
    name: 'TagTracksPage',
    params: { tagName },
    path: [
      'tags',
      encodeURIComponent(tagName),
      'tracks'
    ].join('/')
  }
}
