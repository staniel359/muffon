import axios from 'axios'
import store from '*/store'
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

  const profileId =
    store.state.profile.info.id
  const params = {
    profile_id: profileId,
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
