import saveAudioFile from '../../actions/audioFile/save.js'
import deleteAudioFile from '../../actions/audioFile/delete.js'
import readAudioFileMetadata from '../../actions/audioFile/readMetadata.js'

export function handleSaveAudioFile (
  _,
  {
    trackData
  }
) {
  const trackDataFormatted =
    JSON.parse(
      trackData
    )

  return saveAudioFile(
    {
      trackData:
        trackDataFormatted
    }
  )
}

export function handleDeleteAudioFile (
  _,
  data
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  const {
    fileName
  } = dataFormatted

  return deleteAudioFile(
    fileName
  )
}

export function handleReadAudioFileMetadata (
  _,
  {
    filePath
  }
) {
  return readAudioFileMetadata(
    {
      filePath
    }
  )
}
