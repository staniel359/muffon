import {
  generateKey
} from '../../utils.js'
import getPath from './getPath.js'
import {
  writeFile
} from 'fs'
import findTab from '../tab/find.js'

export default function (
  {
    tabId,
    imageData
  }
) {
  const isImage =
    imageData.includes(
      'data:image'
    )

  const fileName = generateKey()

  const filePath =
    getPath(
      fileName
    )

  function handleComplete (
    error
  ) {
    if (!error) {
      const tab =
        findTab(
          tabId
        )

      const data = {
        id: fileName,
        path: filePath
      }

      tab
        .webContents
        .send(
          'create-background-image',
          data
        )
    }
  }

  if (isImage) {
    const imageDataFormatted =
      imageData.replace(
        /data:image\/(.+);base64,/,
        ''
      )

    const buffer =
      Buffer.from(
        imageDataFormatted,
        'base64'
      )

    writeFile(
      filePath,
      buffer,
      handleComplete
    )
  }
}
