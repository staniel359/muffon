import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    communityId,
    content,
    tracks,
    images,
    byCommunity
  }
) {
  this.error = null
  this.isLoading = true

  const url =
    `/communities/${communityId}/posts`

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token,
    content,
    tracks,
    images,
    by_community: byCommunity
  }

  const handleSuccess = () => {
    this.$emit(
      'success'
    )
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.post(
    url,
    params
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
