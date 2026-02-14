import getRequest from '@/helpers/actions/local/request/get'
import {
  paginatedCollectionData
} from '@/helpers/utils'

export default function (
  {
    page,
    limit,
    scope,
    listScope,
    order
  }
) {
  const handleSuccess = (
    collection
  ) => {
    this.historyData = paginatedCollectionData(
      collection,
      {
        collectionName: listScope,
        page,
        limit
      }
    )
  }

  return getRequest.bind(
    this
  )(
    {
      key: `history.${scope}`,
      order,
      onSuccess: handleSuccess
    }
  )
}
