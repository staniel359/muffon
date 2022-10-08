import formatQuery from '@/helpers/formatters/query'

export function main () {
  return {
    name: 'TopMainPage',
    params: {},
    path: 'top'
  }
}

export function artists (
  {
    country
  } = {}
) {
  const query = {
    country
  }

  const queryFormatted =
    formatQuery(
      {
        query
      }
    )

  const path =
    `top/artists?${queryFormatted.string}`

  return {
    name: 'TopArtistsPage',
    params: {},
    path,
    query: queryFormatted.data
  }
}

export function albums (
  {
    country
  } = {}
) {
  const query = {
    country
  }

  const queryFormatted =
    formatQuery(
      {
        query
      }
    )

  const path =
    `top/albums?${queryFormatted.string}`

  return {
    name: 'TopAlbumsPage',
    params: {},
    path,
    query: queryFormatted.data
  }
}

export function tracks (
  {
    country
  } = {}
) {
  const query = {
    country
  }

  const queryFormatted =
    formatQuery(
      {
        query
      }
    )

  const path =
    `top/tracks?${queryFormatted.string}`

  return {
    name: 'TopTracksPage',
    params: {},
    path,
    query: queryFormatted.data
  }
}

export function tags (
  {
    country
  } = {}
) {
  const query = {
    country
  }

  const queryFormatted =
    formatQuery(
      {
        query
      }
    )

  const path =
    `top/tags?${queryFormatted.string}`

  return {
    name: 'TopTagsPage',
    params: {},
    path,
    query: queryFormatted.data
  }
}
