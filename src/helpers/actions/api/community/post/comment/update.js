import profileStore from '@/stores/profile'
import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    communityId,
    postId,
    commentId,
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
  this.newCommentData = null

  const url = (
    `/communities/${communityId}` +
    `/posts/${postId}` +
    `/comments/${commentId}`
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
    this.newCommentData =
      response
        .data
        .comment
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
