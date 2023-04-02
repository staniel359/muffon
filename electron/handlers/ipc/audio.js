import saveAudio from '../../actions/audio/save.js'
import deleteAudio from '../../actions/audio/delete.js'

export function handleSaveAudio (
  _,
  {
    track,
    tabId
  }
) {
  const trackFormatted =
    JSON.parse(
      track
    )

  saveAudio(
    {
      track: trackFormatted,
      tabId
    }
  )
}

export function handleDeleteAudio (
  _,
  {
    fileName
  }
) {
  deleteAudio(
    fileName
  )
}
