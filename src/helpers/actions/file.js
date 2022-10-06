import {
  parseFile
} from 'music-metadata'
import fs from 'fs'
import crypto from 'crypto'
import {
  tags as formatFileTags
} from '@/helpers/formatters/file'

export function formatTags (
  file
) {
  const handleSuccess = (
    metadata
  ) => {
    const successTrack =
      formatFileTags(
        {
          file,
          tags: metadata.common
        }
      )

    this.addCollectionItem(
      {
        collection: 'successTracks',
        item: successTrack
      }
    )
  }

  const handleError = () => {
    const errorTrack = {
      text: file.path
    }

    this.addCollectionItem(
      {
        collection: 'errorTracks',
        item: errorTrack
      }
    )
  }

  const handleFinish = () => {
    this.incrementProgress()
  }

  return parseFile(
    file.path
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}

export function decrypt (
  {
    filePath,
    key,
    iv
  }
) {
  const file =
    fs.readFileSync(
      filePath
    )

  const decipher =
    crypto.createDecipheriv(
      'aes-256-cbc',
      key,
      iv
    )

  const decryptedFile =
    Buffer.concat(
      [
        decipher.update(
          file
        ),
        decipher.final()
      ]
    )

  const blob = new Blob(
    [
      decryptedFile
    ]
  )

  return URL.createObjectURL(
    blob
  )
}

export function getLink (
  filePath
) {
  const file =
    fs.readFileSync(
      filePath
    )

  const blob = new Blob(
    [
      file
    ]
  )

  return URL.createObjectURL(
    blob
  )
}
