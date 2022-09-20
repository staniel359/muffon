import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    communityId
  }
) {
  const url = `/communities/${communityId}`

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfId: true,
      isWithSelfToken: true,
      onError: handleError
    }
  )
}
