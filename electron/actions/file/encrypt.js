const crypto = require(
  'crypto'
)

function getRandomKey (
  bytesSize
) {
  return crypto.randomBytes(
    bytesSize
  ).toString(
    'hex'
  )
}

function encrypt (
  file
) {
  const key =
    getRandomKey(
      16
    )

  const iv =
    getRandomKey(
      8
    )

  const cipher =
    crypto.createCipheriv(
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

module.exports = encrypt
