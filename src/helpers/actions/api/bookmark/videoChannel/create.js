import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    channelId
  }
) {
  this.bookmarkId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/bookmarks/video_channels`

  const params = {
    youtube_id: channelId
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response
        .data
        .bookmark_video_channel
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
