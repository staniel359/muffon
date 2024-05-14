import crypto from 'crypto'
import readFile from './read.js'

export default function (
  {
    filePath,
    key,
    iv
  }
) {
  const file =
    readFile(
      filePath
    )

  if (file) {
    const decipher =
      crypto.createDecipheriv(
        'aes-256-cbc',
        key,
        iv
      )

    return Buffer.concat(
      [
        decipher.update(
          file
        ),
        decipher.final()
      ]
    )
  }
}
