import {
  generateKey
} from '../../helpers/utils.js'
import {
  audioFolderPath
} from '../../helpers/paths.js'
import {
  download
} from 'electron-dl'
import encryptAudioFile from './encrypt.js'
import getAudioFilePath from './getPath.js'
import {
  currentTime as formatCurrentTime
} from '../../helpers/formatters.js'

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
    mainView,
    url,
    options
  ).then(
    handleSuccess
  )
}
