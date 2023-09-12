import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    profileId,
    postId,
    text,
    images,
    artists,
    albums,
    tracks
  }
) {
  this.commentData = null

  const url = (
    `/profiles/${profileId}` +
    `/posts/${postId}/comments`
  )

  const otherProfileId = profileStore().id

  const params = {
    other_profile_id:
      otherProfileId,
    text,
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
