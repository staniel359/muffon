import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    conversationId,
    scope = '',
    page,
    limit
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/conversations/${conversationId}/${scope}`

  const {
    token
  } = store.state.profile

  const params = {
    token
  }

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
      params,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
