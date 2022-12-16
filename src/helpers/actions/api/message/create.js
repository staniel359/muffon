import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId,
    text,
    images,
    artists,
    albums,
    tracks
  }
) {
  this.conversationId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/messages`

  const params = {
    other_profile_id: otherProfileId,
    text,
    images,
    artists,
    albums,
    tracks
  }

  const handleSuccess = (
    response
  ) => {
    this.conversationId =
      response.data.conversation.id
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
