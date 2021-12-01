import fetchTrackAudioData from '#/actions/audio/track/fetchData'
import { updateStore } from '#/actions'

export default function ({ trackData, queueTracks }) {
  this.error = null
  this.isLoading = true

  const trackDataArgs = {
    trackTitle: trackData.title,
    artistName: trackData.artist.name,
    trackId: trackData.player_id,
    audioData: trackData.audio,
    queueTrackId: trackData.uuid
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

  return fetchTrackAudioData(trackDataArgs)
    .catch(handleError)
    .finally(handleFinish)
}
