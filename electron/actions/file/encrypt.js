import {
  randomBytes,
  createCipheriv
} from 'node:crypto'

export default function (
  file
) {
  function getRandomKey (
    bytesSize
  ) {
    return randomBytes(
      bytesSize
    ).toString(
      'hex'
    )
  }

  const key =
    getRandomKey(
      16
    )

  const iv =
    getRandomKey(
      8
    )

  const cipher =
    createCipheriv(
      'aes-256-cbc',
      key,
      iv
    )

  const encryptedFile =
    Buffer.concat(
      [
        cipher.update(
          file
        ),
        cipher.final()
      ]
    )

  return {
    key,
    iv,
    encryptedFile
  }
}
