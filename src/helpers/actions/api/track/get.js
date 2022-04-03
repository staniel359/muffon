import axios from 'axios'
import store from '*/plugins/store'
import formatTrackRequestUrl from '*/helpers/formatters/request/track/url'

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
  this.error = null
  this.isLoading = true

  const url =
    formatTrackRequestUrl({
      sourceId,
      artistName,
      trackTitle,
      artistId,
      trackId,
      scope
    })

  const profileId =
    store.state.profile.info.id
  const lang =
    store.state.profile.language

  const params = {
    profile_id: profileId,
    lang,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.trackData =
      response.data.track
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
