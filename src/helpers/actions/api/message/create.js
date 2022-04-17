import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId,
    content,
    tracks,
    images
  }
) {
  this.conversationId = null

  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/messages`

  const {
    token
  } = store.state.profile

  const params = {
    other_profile_id: otherProfileId,
    token,
    content,
    tracks,
    images
  }

  const handleSuccess = (
    response
  ) => {
    this.conversationId =
      response.data.conversation_id
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
