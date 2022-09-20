import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    conversationId,
    scope = '',
    page,
    limit
  }
) {
  const profileId =
    store.getters['profile/id']

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
