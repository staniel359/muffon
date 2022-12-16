import profileStore from '@/stores/profile'
import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    postId,
    text,
    images,
    artists,
    albums,
    tracks,
    videos,
    videoPlaylists,
    playlists,
    communities
  }
) {
  this.newPostData = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/posts/${postId}`

  const params = {
    text,
    images,
    artists,
    albums,
    tracks,
    videos,
    video_playlists:
      videoPlaylists,
    playlists,
    communities
  }

  const handleSuccess = (
    response
  ) => {
    this.newPostData =
      response.data.post
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return patchRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
