import {
  parseWebStream
} from 'music-metadata'

export default async function (
  {
    fileUrl,
    options = {}
  }
) {
  const response =
    await fetch(
      fileUrl
    )

  const webStream = response.body

  return parseWebStream(
    webStream,
    options
  )
}
