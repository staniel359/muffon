import fetchSearchData from '#/actions/api/player/search/fetchData'
import fetchVariantData from '#/actions/audio/variant/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'
import {
  setCurrentTrackId as setPlayerCurrentTrackId,
  resetVariants as resetPlayerVariants
} from '#/actions/player'
import { setCurrentTrackId as setQueueCurrentTrackId } from '#/actions/queue'

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
    resetPlayerVariants()

    setCurrentTrackIds()
  }

  const setCurrentTrackIds = () => {
    setPlayerCurrentTrackId(trackId)
    setQueueCurrentTrackId(queueTrackId)
  }

  const searchAudio = () => {
    const searchDataArgs = { artistName, trackTitle }

    return fetchSearchData(searchDataArgs)
      .then(handleSearchSuccess)
  }

  const handleSearchSuccess = () => {
    const variantDataArgs = { index: 0 }

    return fetchVariantData(variantDataArgs)
      .then(handleVariantSuccess)
  }

  const handleVariantSuccess = () => {
    setCurrentTrackIds()
  }

  if (audioData?.present) {
    return getAudio()
  } else {
    return searchAudio()
  }
}
