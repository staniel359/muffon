import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default function getPlayerSearch (
  {
    query,
    limit = 20,
    fallbackSourceIndex
  }
) {
  const {
    source,
    fallbackSources
  } = store.state.player

  function getSource () {
    if (fallbackSourceIndex >= 0) {
      return fallbackSources[
        fallbackSourceIndex
      ]
    } else {
      return source
    }
  }

  const url = `/${getSource()}/search/tracks`

  const params = {
    query
  }

  async function handleSuccess (
    response
  ) {
    const {
      tracks
    } = response.data.search

    const variants =
      formatCollection(
        tracks
      )

    await updateGlobalStore(
      {
        'player.variants': variants
      }
    )
  }

  function searchInFallbackSource (
    nextFallbackSourceIndex
  ) {
    return getPlayerSearch(
      {
        query,
        limit,
        fallbackSourceIndex:
          nextFallbackSourceIndex
      }
    )
  }

  function searchInNextFallbackSource (
    error
  ) {
    const nextFallbackSourceIndex =
      fallbackSourceIndex + 1

    const nextFallbackSource =
      fallbackSources[
        nextFallbackSourceIndex
      ]

    if (nextFallbackSource) {
      return searchInFallbackSource(
        nextFallbackSourceIndex
      )
    } else {
      throw error
    }
  }

  function searchInFallbackSources (
    error
  ) {
    if (fallbackSourceIndex >= 0) {
      return searchInNextFallbackSource(
        error
      )
    } else {
      return searchInFallbackSource(
        0
      )
    }
  }

  function handleError (
    error
  ) {
    if (fallbackSources.length) {
      return searchInFallbackSources(
        error
      )
    } else {
      throw error
    }
  }

  return getRequest(
    {
      url,
      params,
      limit,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
