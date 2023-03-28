import saveAudio from '../../actions/audio/save.js'
import deleteAudio from '../../actions/audio/delete.js'

export function handleSaveAudio (
  _,
  {
    track,
    tabId
  }
) {
  saveAudio(
    {
      track,
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
