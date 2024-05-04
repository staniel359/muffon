import {
  generateKey
} from '#/helpers/utils'
import {
  audioFolderPath
} from '#/helpers/paths'
import {
  download
} from 'electron-dl'
import encryptAudioFile from './encrypt'
import getAudioFilePath from './getPath'
import {
  currentTime as formatCurrentTime
} from '#/helpers/formatters'

export default function (
  {
    trackData
  }
) {
  const url = trackData.audio.link

  const fileName = generateKey()

  const tempFileName = `${fileName}-temp`

  const options = {
    directory: audioFolderPath,
    filename: tempFileName
  }

  function handleSuccess () {
    const filePath =
      getAudioFilePath(
        fileName
      )

    const encryptedData =
      encryptAudioFile(
        {
          tempFileName,
          fileName
        }
      )

    const {
      key,
      iv
    } = encryptedData

    const localData = {
      path: filePath,
      key,
      iv
    }

    delete trackData.audio.link

    trackData.audio.local = localData

    trackData.uuid = fileName

    trackData.created =
      formatCurrentTime()

    return trackData
  }

  return download(
    mainWindow,
    url,
    options
  ).then(
    handleSuccess
  )
}
