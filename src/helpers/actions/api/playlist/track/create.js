import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    playlistId,
    trackTitle,
    artistName,
    albumTitle,
    imageUrl,
    isSelectable
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playlists` +
    `/${playlistId}/tracks`

  const params = {
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image_url: imageUrl
  }

  const handleSuccess = (
    response
  ) => {
    if (isSelectable) {
      this.playlistTrackId =
          response.data.playlist_track.id

      this.paginationItem.tracks_count =
        response.data.playlist.tracks_count
    }
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
