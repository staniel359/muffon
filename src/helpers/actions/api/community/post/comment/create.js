import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    communityId,
    postId,
    text,
    images,
    artists,
    albums,
    tracks,
    byCommunity
  }
) {
  this.commentData = null

  const url = (
    `/communities/${communityId}` +
    `/posts/${postId}/comments`
  )

  const otherProfileId = profileStore().id

  const params = {
    other_profile_id:
      otherProfileId,
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
    this.commentData =
      response
        .data
        .comment
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
