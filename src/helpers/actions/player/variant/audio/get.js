import store from '*/plugins/store'
import getBandcampId from '*/helpers/actions/api/bandcampId/get'
import getAudio from '*/helpers/actions/api/audio/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default async function (
  {
    variantId,
    isFromRadio
  }
) {
  const {
    variants
  } = store.state.player

  function isMatchedVariant (
    variantData
  ) {
    return (
      variantData.uuid ===
        variantId
    )
  }

  const trackData =
    variants.find(
      isMatchedVariant
    )

  trackData.from_radio = isFromRadio

  function getTrackData () {
    const isBandcampVariant = (
      trackData.source.name ===
        'bandcamp'
    )

    if (isBandcampVariant) {
      const sourceData = trackData.source

      const bandcampIdArgs = {
        model: 'track',
        slug: sourceData.slug,
        artistSlug:
          sourceData.artist_slug
      }

      return getBandcampId(
        bandcampIdArgs
      )
    } else {
      return trackData
    }
  }

  const audioArgs = {
    trackData:
      await getTrackData()
  }

  function handleSuccess () {
    updateGlobalStore(
      {
        'player.currentVariantId':
          variantId
      }
    )
  }

  return getAudio(
    audioArgs
  ).then(
    handleSuccess
  )
}
