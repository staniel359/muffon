import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.libraryId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/library/artists`

  const params = {
    name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.libraryId =
      response.data.library_artist.id.toString()
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
