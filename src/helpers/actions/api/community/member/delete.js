import store from '@/plugins/store'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    communityId
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/communities/${communityId}/members/${profileId}`

  const handleSuccess = (
    response
  ) => {
    this.isMember = false
    this.membersCount =
      response.data.community.members_count
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
