import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName
  }
) {
  this.listenedId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/listened/tracks`

  const params = {
    title: trackTitle,
    artist_name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.listenedId =
      response.data.listened_track.id.toString()
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
