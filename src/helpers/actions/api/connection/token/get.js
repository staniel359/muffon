import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    source
  }
) {
  const url =
    `/${source}/connections/token`

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
