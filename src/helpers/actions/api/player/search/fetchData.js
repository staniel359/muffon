import axios from 'axios'
import {
  getSourceId as getPlayerSourceId,
  setVariants as setPlayerVariants
} from '#/actions/player'
import { collection as formatCollection } from '#/formatters'

export default function ({ query }) {
  const url = `/${getPlayerSourceId()}/search/tracks`

  const params = { query }

  const handleSuccess = resp => {
    const variantsFormatted = formatCollection(
      resp.data.search.tracks
    )

    setPlayerVariants(variantsFormatted)
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
}
