export function main (
  {
    tagName
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  const path = `tags/${tagNameEncoded}`

  return {
    name: 'TagPage',
    params: {
      tagName
    },
    path
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

  const path =
    `tags/${tagNameEncoded}/artists`

  return {
    name: 'TagArtistsPage',
    params: {
      tagName
    },
    path
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

  const path =
    `tags/${tagNameEncoded}/albums`

  return {
    name: 'TagAlbumsPage',
    params: {
      tagName
    },
    path
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

  const path =
    `tags/${tagNameEncoded}/tracks`

  return {
    name: 'TagTracksPage',
    params: {
      tagName
    },
    path
  }
}
