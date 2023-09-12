import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId,
    text,
    images,
    artists,
    albums,
    tracks
  }
) {
  this.postData = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/posts`

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
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
