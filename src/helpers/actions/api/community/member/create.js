import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    communityId
  }
) {
  this.isError = false
  this.isLoading = true

  const url =
    `/communities/${communityId}/members`

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token
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
