import axios from 'axios'
import {
  getSourceId as getPlayerSourceId,
  setVariants as setPlayerVariants
} from '#/actions/player'
import { collection as formatCollection } from '#/formatters'

export default function ({ query }) {
  const url = `/${getPlayerSourceId()}/search/tracks`

  const limit = 20
  const params = { query, limit }

  const handleSuccess = resp => {
    const variantsFormatted = formatCollection(
      resp.data.search.tracks.slice(0, limit)
    )

    setPlayerVariants(variantsFormatted)
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
}
