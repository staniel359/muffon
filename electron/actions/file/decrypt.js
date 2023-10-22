import crypto from 'crypto'
import read from './read'

export default function (
  {
    filePath,
    key,
    iv
  }
) {
  const file =
    read(
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
