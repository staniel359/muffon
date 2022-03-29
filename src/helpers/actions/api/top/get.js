import axios from 'axios'
import store from '*/plugins/store'

export default function ({ scope, page, limit }) {
  this.error = null
  this.isLoading = true

  const url = `/lastfm/top/${scope}`

  const profileId =
    store.state.profile.info.id
  const params = {
    profile_id: profileId,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.topData = response.data.top
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
