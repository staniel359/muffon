import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.listenedId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/listened/artists`

  const params = {
    name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.listenedId =
      response.data.listened_artist.id.toString()
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
