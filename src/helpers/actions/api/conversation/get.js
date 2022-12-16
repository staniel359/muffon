import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    conversationId,
    scope = '',
    page,
    limit
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/conversations` +
    `/${conversationId}/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.conversationData =
      response.data.conversation
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
