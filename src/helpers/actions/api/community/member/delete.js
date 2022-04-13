import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    communityId
  }
) {
  this.isError = false
  this.isLoading = true

  const profileId =
    store.state.profile.info.id

  const url =
    `/communities/${communityId}/members/${profileId}`

  const {
    token
  } = store.state.profile

  const params = {
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

  return axios.delete(
    url,
    {
      params
    }
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
