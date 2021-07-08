import axios from 'axios'
import { handleEnvError } from '#/utils'
import formatRequestUrl from './formatters/requestUrl'

export default function ({
  sourceId = 'lastfm',
  artistName,
  trackTitle,
  artistId,
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
    artistId,
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

    handleEnvError(error)
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
