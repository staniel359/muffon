import getRequest from '@/helpers/actions/api/request/get'

export default function () {
  const url =
    '/lastfm/connections/token'

  const handleSuccess = (
    response
  ) => {
    this.connectData = response.data
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      isWithSelfLanguage: true,
      onSuccess: handleSuccess
    }
  )
}
