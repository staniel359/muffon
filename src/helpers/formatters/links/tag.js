export function main (
  {
    tagName
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  return {
    name: 'TagMainPage',
    params: {
      tagName
    },
    path: [
      'tags',
      tagNameEncoded
    ].join(
      '/'
    )
  }
}

export function artists (
  {
    tagName
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  return {
    name: 'TagArtistsPage',
    params: {
      tagName
    },
    path: [
      'tags',
      tagNameEncoded,
      'artists'
    ].join(
      '/'
    )
  }
}

export function albums (
  {
    tagName
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  return {
    name: 'TagAlbumsPage',
    params: {
      tagName
    },
    path: [
      'tags',
      tagNameEncoded,
      'albums'
    ].join(
      '/'
    )
  }
}

export function tracks (
  {
    tagName
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  return {
    name: 'TagTracksPage',
    params: {
      tagName
    },
    path: [
      'tags',
      tagNameEncoded,
      'tracks'
    ].join(
      '/'
    )
  }
}
