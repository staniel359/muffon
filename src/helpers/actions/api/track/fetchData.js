import axios from 'axios'
import { raiseProductionError } from '#/utils'
import formatRequestUrl from './formatters/requestUrl'

export default function ({
  sourceId = 'lastfm',
  artistName,
  trackTitle,
  trackId,
  scope = '',
  page,
  limit
}) {
  this.isLoading = true

  const urlFormatted = formatRequestUrl({
    sourceId,
    artistName,
    trackTitle,
    trackId,
    scope
  })

  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.trackData = response.data.track
  }

  const handleError = error => {
    this.error = error

    raiseProductionError(error)
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(urlFormatted, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
