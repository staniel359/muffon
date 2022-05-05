import getRequest from '*/helpers/actions/api/request/get'

export default function () {
  const url = '/lastfm/connect/token'

  const handleSuccess = (
    response
  ) => {
    this.connectData =
      response.data.connect
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
