const saveAudio = require(
  '../../actions/audio/save'
)
const removeAudio = require(
  '../../actions/audio/remove'
)

function handleSaveAudio (
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

function handleDeleteAudio (
  _,
  {
    fileName
  }
) {
  removeAudio(
    fileName
  )
}

module.exports = {
  handleSaveAudio,
  handleDeleteAudio
}
