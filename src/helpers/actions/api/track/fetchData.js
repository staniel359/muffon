import axios from 'axios'
import { raiseProductionError } from '#/utils'

export default function ({
  artistName,
  trackTitle,
  scope = '',
  page,
  limit
}) {
  this.isLoading = true

  const artistNameEncoded = encodeURIComponent(artistName)
  const trackTitleEncoded = encodeURIComponent(trackTitle)
  const url =
    `/lastfm/artists/${artistNameEncoded}` +
    `/tracks/${trackTitleEncoded}/${scope}`

  const params = {
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.error = null
    this.trackData = response.data.track
  }

  const handleError = error => {
    this.trackData = null
    this.error = error

    raiseProductionError(error)
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
