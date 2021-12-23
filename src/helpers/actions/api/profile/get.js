import axios from 'axios'
import store from '&/store'

export default function ({ profileId, token, scope = '' }) {
  this.error = null
  this.isLoading = true

  const url = `/profiles/${profileId}/${scope}`

  const otherProfileId =
    store.state.profile?.info?.id
  const params = {
    token,
    ...(otherProfileId && {
      other_profile_id: otherProfileId
    })
  }

  const handleSuccess = response => {
    this.profileData =
      response.data.profile
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
