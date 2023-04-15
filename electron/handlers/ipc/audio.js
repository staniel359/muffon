import saveAudio from '../../actions/audio/save.js'
import deleteAudio from '../../actions/audio/delete.js'

export function handleSaveAudio (
  _,
  {
    trackData
  }
) {
  const trackDataFormatted =
    JSON.parse(
      trackData
    )

  return saveAudio(
    {
      trackData:
        trackDataFormatted
    }
  )
}

export function handleDeleteAudio (
  _,
  {
    fileName
  }
) {
  return deleteAudio(
    fileName
  )
}
