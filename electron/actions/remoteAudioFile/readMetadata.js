import {
  parseWebStream
} from 'music-metadata'

export default async function (
  {
    fileUrl
  }
) {
  const response =
    await fetch(
      fileUrl
    )

  const webStream = response.body

  const contentLength =
    response
      .headers
      .get(
        'Content-Length'
      )

  const contentType =
    response
      .headers
      .get(
        'Content-Type'
      )

  return parseWebStream(
    webStream,
    {
      mimeType: contentType,
      size: contentLength
    },
    {
      duration: true,
      skipCovers: true
    }
  )
}
