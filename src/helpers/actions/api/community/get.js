import axios from 'axios'
import store from '*/plugins/store'

export default function ({ communityId, scope = '', page, limit }) {
  this.error = null
  this.isLoading = true

  const url =
    `/communities/${communityId}/${scope}`

  const profileId =
    store.state.profile.info.id

  const params = {
    profile_id: profileId,
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    this.communityData =
      response.data.community
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
