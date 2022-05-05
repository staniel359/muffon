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
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/messages`

  const params = {
    other_profile_id: otherProfileId,
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

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
