import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  this.bookmarkId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/bookmarks/artists`

  const params = {
    name: artistName
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response.data.bookmark_artist.id.toString()
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
