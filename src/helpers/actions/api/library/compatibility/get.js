import axios from 'axios'
import store from '&/store'

export default function ({ otherProfileId, scope = '', page, limit }) {
  this.error = null
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/library/compatibility/${scope}`

  const params = {
    other_profile_id: otherProfileId,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.compatibilityData =
      response.data.compatibility
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
