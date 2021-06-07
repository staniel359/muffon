import fetchSearchData from '#/actions/api/player/search/fetchData'
import fetchVariantData from '#/actions/audio/variant/fetchData'
import fetchAudioData from '#/actions/api/audio/fetchData'
import {
  setCurrentTrackId as setPlayerCurrentTrackId,
  setCurrentVariantId as setPlayerCurrentVariantId,
  getVariants as getPlayerVariants,
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
    const query = `${artistName} - ${trackTitle}`
    const searchDataArgs = { query }

    return fetchSearchData(searchDataArgs)
      .then(handleSearchSuccess)
  }

  const getFirstVariantId = () => {
    return getPlayerVariants()[0].uuid
  }

  const handleSearchSuccess = () => {
    const variantId = getFirstVariantId()

    return fetchVariantData({ variantId })
      .then(handleVariantSuccess)
  }

  const handleVariantSuccess = () => {
    setCurrentTrackIds()

    setPlayerCurrentVariantId(
      getFirstVariantId()
    )
  }

  if (audioData?.present) {
    return getAudio()
  } else {
    return searchAudio()
  }
}
