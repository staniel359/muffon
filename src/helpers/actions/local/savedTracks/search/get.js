import getRequest from '@/helpers/actions/local/request/get'
import {
  filterLocalTracksByQuery,
  paginatedCollectionData
} from '@/helpers/utils'

export default function (
  {
    query,
    page,
    limit,
    order
  }
) {
  const handleSuccess = (
    collection
  ) => {
    const collectionFiltered =
      filterLocalTracksByQuery(
        collection,
        {
          query
        }
      )

    this.savedTracksData = paginatedCollectionData(
      collectionFiltered,
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
