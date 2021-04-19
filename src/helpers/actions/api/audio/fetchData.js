import axios from 'axios'
import { pathCase } from 'path-case'
import {
  setPlaying as setPlayerPlaying,
  getPlaying as getPlayerPlaying
} from '#/actions/player'
import { load as loadAudio } from '#/actions/audio'

export default function ({ audioData }) {
  const sourceId = audioData.source
  const audioId = audioData.id
  const artistId = audioData.artist_id

  const formatSourceId = () => {
    if (sourceId === 'bandcamp') {
      return `${sourceId}/artists/${artistId}`
    } else {
      return pathCase(sourceId)
    }
  }

  const url = `/${formatSourceId()}/tracks/${audioId}`

  const params = {}

  const handleSuccess = resp => {
    setPlayerPlaying({
      ...resp.data.track,
      album: audioData.album,
      image: audioData.image
    })

    loadAudio(getPlayerPlaying().audio.link)
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
}
