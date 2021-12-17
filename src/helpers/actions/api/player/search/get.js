import axios from 'axios'
import store from '&/store'
import { collection as formatCollection } from '#/formatters'
import { updateStore } from '#/actions'

export default function ({ query }) {
  const sourceId = store.state.player.sourceId
  const url = `/${sourceId}/search/tracks`

  const limit = 20
  const params = {
    query,
    limit
  }

  const handleSuccess = response => {
    const { tracks } = response.data.search

    const tracksCollection =
      formatCollection(
        tracks
      )

    store.dispatch(
      'player/setVariants',
      tracksCollection
    )

    updateStore({
      'player.variants': tracksCollection
    })
  }

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  )
}
