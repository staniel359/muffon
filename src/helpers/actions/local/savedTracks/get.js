import getRequest from '@/helpers/actions/local/request/get'
import {
  paginatedCollectionData
} from '@/helpers/utils'

export default function (
  {
    page,
    limit,
    order
  }
) {
  const handleSuccess = (
    collection
  ) => {
    this.savedTracksData = paginatedCollectionData(
      collection,
      {
        collectionName: 'tracks',
        page,
        limit
      }
    )
  }

  return getRequest.bind(
    this
  )(
    {
      key: 'profile.savedTracks',
      order,
      onSuccess: handleSuccess
    }
  )
}
