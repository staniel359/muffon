import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName
  }
) {
  this.listenedId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/listened/tracks`

  const params = {
    track_title: trackTitle,
    artist_name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.listenedId =
      response
        .data
        .listened_track
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
