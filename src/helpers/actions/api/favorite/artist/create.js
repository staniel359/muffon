import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.favoriteId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/favorites/artists`

  const params = {
    artist_name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response.data.favorite_artist.id.toString()
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
