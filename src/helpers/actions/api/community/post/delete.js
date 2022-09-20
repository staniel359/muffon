import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    communityId,
    postId
  }
) {
  const url =
    `/communities/${communityId}/posts/${postId}`

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
