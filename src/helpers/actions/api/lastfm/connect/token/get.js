import getRequest from '*/helpers/actions/api/request/get'

export default function () {
  const url = '/lastfm/connect/token'

  const handleSuccess = (
    response
  ) => {
    const {
      token,
      link
    } = response.data.connect

    this.token = token
    this.link = link
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
