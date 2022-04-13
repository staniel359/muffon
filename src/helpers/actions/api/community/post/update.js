import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    communityId,
    postId,
    content,
    tracks,
    images,
    byCommunity
  }
) {
  this.error = null
  this.isLoading = true

  const url =
    `/communities/${communityId}/posts/${postId}`

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

  const handleSuccess = (
    response
  ) => {
    this.$emit(
      'success',
      response.data.post
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

  axios.patch(
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
