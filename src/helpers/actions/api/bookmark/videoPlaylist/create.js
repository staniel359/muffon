import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    playlistId
  }
) {
  this.bookmarkId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/bookmarks/video_playlists`

  const params = {
    youtube_id: playlistId
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response
        .data
        .bookmark_video_playlist
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
