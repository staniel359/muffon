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
    query,
    limit = 20,
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

  const url = `/${audioSource}/search/tracks`

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

    if (tracks.length) {
      return setVariants(
        tracks
      )
    } else {
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
