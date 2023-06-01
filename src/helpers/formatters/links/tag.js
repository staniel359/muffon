export function main (
  {
    tagName
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  const params = {
    tagName:
      tagNameEncoded
  }

  const path = `tags/${tagNameEncoded}`

  return {
    name: 'TagPage',
    params,
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

  const params = {
    tagName:
      tagNameEncoded
  }

  const path =
    `tags/${tagNameEncoded}/artists`

  return {
    name: 'TagArtistsPage',
    params,
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

  const params = {
    tagName:
      tagNameEncoded
  }

  const path =
    `tags/${tagNameEncoded}/albums`

  return {
    name: 'TagAlbumsPage',
    params,
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

  const params = {
    tagName:
      tagNameEncoded
  }

  const path =
    `tags/${tagNameEncoded}/tracks`

  return {
    name: 'TagTracksPage',
    params,
    path
  }
}
