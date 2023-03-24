import saveAudio from '../../actions/audio/save.js'
import removeAudio from '../../actions/audio/remove.js'

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
  removeAudio(
    fileName
  )
}
