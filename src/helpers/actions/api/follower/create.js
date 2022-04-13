import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    otherProfileId
  }
) {
  this.isError = false
  this.isLoading = true

  const profileId =
    store.state.profile.info.id

  const url = `/profiles/${profileId}/followers`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    other_profile_id: otherProfileId
  }

  const handleError = (
    error
  ) => {
    this.isError = true

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.post(
    url,
    params
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
