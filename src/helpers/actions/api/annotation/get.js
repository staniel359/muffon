import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    annotationId
  }
) {
  const url =
    `/genius/annotations/${annotationId}`

  const handleSuccess = (
    response
  ) => {
    this.annotationData =
      response.data.annotation
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
