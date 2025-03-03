import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    videoId
  }
) {
  this.watchedId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/watched/videos`

  const params = {
    youtube_id: videoId
  }

  const handleSuccess = (
    response
  ) => {
    this.watchedId =
      response
        .data
        .watched_video
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
