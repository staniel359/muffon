import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    communityId
  }
) {
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

  const handleSuccess = (
    response
  ) => {
    this.isMember = false
    this.membersCount =
      response
        .data
        .community_members_count
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess
    }
  )
}
