import {
  generateKey
} from '#/utils'
import {
  audioFolderPath
} from '#/paths'
import {
  download
} from 'electron-dl'
import encrypt from './encrypt'
import getPath from './getPath'
import {
  currentTime as formatCurrentTime
} from '#/formatters'

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
      getPath(
        fileName
      )

    const encryptedData =
      encrypt(
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
