import getRequest from '@/helpers/actions/local/request/get'

export default function (
  {
    scope,
    listScope,
    order
  }
) {
  const handleSuccess = (
    response
  ) => {
    this.historyData = response
  }

  return getRequest.bind(
    this
  )(
    {
      key: `history.${scope}`,
      listScope,
      order,
      onSuccess: handleSuccess
    }
  )
}
