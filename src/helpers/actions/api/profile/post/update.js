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
    videoChannels,
    videoPlaylists,
    playlists,
    communities
  }
) {
  this.newPostData = null

  const profileId = profileStore().id

  const url = (
    `/profiles/${profileId}` +
    `/posts/${postId}`
  )

  const params = {
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
    }),
    ...(videos.length && {
      videos
    }),
    ...(videoChannels.length && {
      video_channels:
        videoChannels
    }),
    ...(videoPlaylists.length && {
      video_playlists:
        videoPlaylists
    }),
    ...(playlists.length && {
      playlists
    }),
    ...(communities.length && {
      communities
    })
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
