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
    `/lastfm/artists/${artistNameEncoded}/images`

  const handleSuccess = (
    response
  ) => {
    const {
      image,
      images
    } = response.data.artist

    this.image = image

    this.images =
      images.slice(
        0,
        20
      )
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
