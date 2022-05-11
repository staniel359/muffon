import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    communityId,
    text,
    images,
    artists,
    albums,
    tracks,
    byCommunity
  }
) {
  const url =
    `/communities/${communityId}/posts`

  const params = {
    text,
    images,
    artists,
    albums,
    tracks,
    by_community: byCommunity
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
