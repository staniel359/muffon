import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    videoId
  }
) {
  this.favoriteId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/favorites/videos`

  const params = {
    youtube_id: videoId
  }

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response
        .data
        .favorite_video
        .id
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
