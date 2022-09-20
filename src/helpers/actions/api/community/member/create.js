import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    communityId
  }
) {
  const url =
    `/communities/${communityId}/members`

  const handleSuccess = (
    response
  ) => {
    this.isMember = true
    this.membersCount =
      response.data.community.members_count
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
