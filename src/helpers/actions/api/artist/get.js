import getRequest from '@/helpers/actions/api/request/get'
import formatArtistRequestUrl from '@/helpers/formatters/request/artist/url'

export default function (
  {
    source = 'lastfm',
    artistName,
    artistId,
    albumType = '',
    scope = '',
    page,
    limit,
    update
  }
) {
  const url =
    formatArtistRequestUrl(
      {
        source,
        artistName,
        artistId,
        scope
      }
    )

  const params = {
    ...(albumType && {
      album_type: albumType
    }),
    ...(update && {
      update
    })
  }

  const handleSuccess = (
    response
  ) => {
    const {
      artist
    } = response.data

    this.artistData = artist

    if (scope === 'tracks') {
      this.topTrackCount ||=
        artist.tracks[0].listeners_count
    }
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      isWithSelfLanguage: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
