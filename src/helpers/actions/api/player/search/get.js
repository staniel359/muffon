import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'
import {
  collection as formatCollection
} from '*/helpers/formatters'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default function (
  {
    query,
    limit = 20
  }
) {
  const playerSource =
    store.state.player.source

  const url =
    `/${playerSource}/search/tracks`

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

  return getRequest(
    {
      url,
      params,
      limit,
      onSuccess: handleSuccess
    }
  )
}
