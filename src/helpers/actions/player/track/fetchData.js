import fetchTrackAudioData from '#/actions/audio/track/fetchData'
import { setGlobalData } from '#/actions'

export default function ({ trackData, queueTracks }) {
  this.isLoading = true
  this.error = null

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
      setGlobalData({
        'queue.tracks': queueTracks
      })
    }
  }

  return fetchTrackAudioData(trackDataArgs)
    .catch(handleError)
    .finally(handleFinish)
}
