import playerStore from '@/stores/player'
import getRequest from '@/helpers/actions/api/request/get'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

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

  const {
    isWithAutomatch
  } = playerStore()

  const params = {
    query,
    ...(isWithAutomatch && {
      with_automatch: true,
      artist_name: artistName,
      track_title: trackTitle
    })
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
    const variants =
      response
        .data
        .search
        .tracks

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
