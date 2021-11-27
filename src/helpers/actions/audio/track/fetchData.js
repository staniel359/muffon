import store from '&/store'
import fetchSearchData from '#/actions/api/player/search/fetchData'
import fetchVariantData from '#/actions/audio/variant/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'
import { updateStore } from '#/actions'

export default function ({
  artistName,
  trackTitle,
  trackId,
  audioData,
  queueTrackId
}) {
  const getAudio = () => {
    const audioDataArgs = { audioData }

    return fetchAudioData(audioDataArgs)
      .then(handleAudioSuccess)
  }

  const handleAudioSuccess = () => {
    updateStore({
      'player.variants': []
    })

    setCurrentTrackIds()
  }

  const setCurrentTrackIds = () => {
    updateStore({
      'player.currentTrackId': trackId,
      'queue.currentTrackId': queueTrackId
    })
  }

  const searchAudio = () => {
    const query = `${artistName} - ${trackTitle}`
    const searchDataArgs = { query }

    return fetchSearchData(searchDataArgs)
      .then(handleSearchSuccess)
  }

  const getFirstVariantId = () => {
    return store.state.player.variants[0].uuid
  }

  const handleSearchSuccess = () => {
    const variantId = getFirstVariantId()

    return fetchVariantData({ variantId })
      .then(handleVariantSuccess)
  }

  const handleVariantSuccess = () => {
    setCurrentTrackIds()

    updateStore({
      'player.currentVariantId':
        getFirstVariantId()
    })
  }

  if (audioData?.present) {
    return getAudio()
  } else {
    return searchAudio()
  }
}
