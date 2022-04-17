import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    artistName
  }
) {
  const artistNameEncoded =
    encodeURIComponent(
      artistName
    )

  const url =
    `/lastfm/artists/${artistNameEncoded}/image`

  const handleSuccess = (
    response
  ) => {
    const {
      image
    } = response.data.artist

    this.image = image
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      onSuccess: handleSuccess
    }
  )
}
