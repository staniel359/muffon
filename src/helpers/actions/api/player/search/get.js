import playerStore from '@/stores/player'
import getRequest from '@/helpers/actions/api/request/get'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default function getPlayerSearch (
  {
    source,
    query,
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

  const params = {
    query
  }

  async function setVariants (
    tracks
  ) {
    const variants =
      formatCollection(
        tracks
      )

    await updateGlobalStore(
      {
        'player.variants': variants
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
          query,
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
    const {
      tracks
    } = response.data.search

    await setVariants(
      tracks
    )

    const isSearchInNextAudioSource = (
      !tracks.length && !source
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
