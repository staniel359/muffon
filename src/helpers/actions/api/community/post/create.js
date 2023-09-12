import postRequest from '@/helpers/actions/api/request/post'

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
  this.postData = null

  const url =
    `/communities/${communityId}/posts`

  const params = {
    text,
    by_community: byCommunity,
    ...(images.length && {
      images
    }),
    ...(artists.length && {
      artists
    }),
    ...(albums.length && {
      albums
    }),
    ...(tracks.length && {
      tracks
    })
  }

  const handleSuccess = (
    response
  ) => {
    this.postData =
      response
        .data
        .post
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
