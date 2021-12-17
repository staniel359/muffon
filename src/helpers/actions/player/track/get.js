import getPlayerTrackAudio from '#/actions/player/track/audio/get'
import { updateStore } from '#/actions'

export default function ({ trackData, queueTracks }) {
  this.error = null
  this.isLoading = true

  const playerTrackAudioArgs = {
    trackTitle:
      trackData.title,
    artistName:
      trackData.artist.name,
    trackId:
      trackData.player_id,
    audioData:
      trackData.audio,
    queueTrackId:
      trackData.uuid
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false

    if (queueTracks) {
      updateStore({
        'queue.tracks': queueTracks
      })
    }
  }

  return getPlayerTrackAudio(
    playerTrackAudioArgs
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
