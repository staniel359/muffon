import {
  decrypt as decryptAudioFile
} from '@/helpers/actions/audioFile'
import {
  setPlaying as setPlayerPlaying
} from '@/helpers/actions/player'

export default function (
  {
    trackData
  }
) {
  const {
    path,
    key,
    iv
  } = trackData.audio.local

  const decryptArgs = {
    filePath: path,
    key,
    iv
  }

  function handleSuccess (
    result
  ) {
    const playingData = {
      ...trackData
    }

    playingData.audio.link = result

    setPlayerPlaying(
      playingData
    )
  }

  function handleError () {
    throw new Error()
  }

  return decryptAudioFile(
    decryptArgs
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
