import playerStore from '@/stores/player'
import getRequest from '@/helpers/actions/api/request/get'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import {
  isStringsIncludeEachOther
} from '@/helpers/utils'

export default function getPlayerSearch (
  {
    source,
    trackData,
    limit,
    audioSourceIndex = 0
  }
) {
  const {
    audioSources
  } = playerStore()

  const audioSource =
    audioSources[
      audioSourceIndex
    ]

  const sourceComputed = (
    source || audioSource
  )

  const url = `/${sourceComputed}/search/tracks`

  const artistName =
    trackData.artist.name

  const trackTitle = trackData.title

  const query = [
    artistName,
    trackTitle
  ].join(
    ' - '
  )

  const params = {
    query
  }

  function isMatchedVariant (
    variantData
  ) {
    const variantArtistName =
      variantData
        .artist
        .name

    const isArtistNamesMatch =
      isStringsIncludeEachOther(
        variantArtistName,
        artistName
      )

    const variantTrackTitle = variantData.title

    const isTitlesMatch =
      isStringsIncludeEachOther(
        variantTrackTitle,
        trackTitle
      )

    return (
      isArtistNamesMatch &&
        isTitlesMatch
    )
  }

  async function setVariants (
    variants
  ) {
    const variantsFormatted =
      formatCollection(
        variants
      )

    return updateGlobalStore(
      {
        'player.variants': variantsFormatted
      }
    )
  }

  function searchInNextAudioSource () {
    const nextAudioSourceIndex =
      audioSourceIndex + 1

    const nextAudioSource =
      audioSources[
        nextAudioSourceIndex
      ]

    if (nextAudioSource) {
      return getPlayerSearch(
        {
          trackData,
          limit,
          audioSourceIndex:
            nextAudioSourceIndex
        }
      )
    }
  }

  async function handleSuccess (
    response
  ) {
    let variants =
      response
        .data
        .search
        .tracks

    const {
      isWithAutomatch
    } = playerStore()

    if (isWithAutomatch) {
      variants =
        variants.filter(
          isMatchedVariant
        )
    }

    await setVariants(
      variants
    )

    const isSearchInNextAudioSource = (
      !variants.length && !source
    )

    if (isSearchInNextAudioSource) {
      return searchInNextAudioSource()
    }
  }

  return getRequest(
    {
      url,
      params,
      limit,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
