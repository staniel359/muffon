import axios from 'axios'
import store from '*/plugins/store'
import {
  collection as formatCollection
} from '*/helpers/formatters'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default function (
  {
    query
  }
) {
  const {
    sourceId
  } = store.state.player

  const url = `/${sourceId}/search/tracks`

  const limit = 20

  const params = {
    query,
    limit
  }

  function handleSuccess (
    response
  ) {
    const {
      tracks
    } = response.data.search

    const tracksCollection =
      formatCollection(
        tracks
      )

    store.dispatch(
      'player/setVariants',
      tracksCollection
    )

    updateGlobalStore(
      {
        'player.variants': tracksCollection
      }
    )
  }

  return axios.get(
    url,
    {
      params
    }
  ).then(
    handleSuccess
  )
}
