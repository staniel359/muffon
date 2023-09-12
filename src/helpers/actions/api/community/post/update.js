import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    communityId,
    postId,
    text,
    byCommunity,
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

  const url = (
    `/communities/${communityId}` +
    `/posts/${postId}`
  )

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
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
