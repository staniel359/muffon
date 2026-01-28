import {
  uint8ArrayToBase64
} from 'uint8array-extras'

function formatImageBase64String (
  cover
) {
  if (!cover) { return }

  const {
    format,
    data: bytes
  } = cover

  const bytesBase64String =
    uint8ArrayToBase64(
      bytes
    )

  return `data:${format};base64,${bytesBase64String}`
}

export async function metatags (
  {
    filePath,
    metatags
  }
) {
  const artistData = {
    name: metatags.artist
  }

  const albumData = {
    title: metatags.album
  }

  const cover =
    await window
      .mainProcess
      .sendAsyncCommand(
        'read-audio-file-cover',
        {
          imageData: metatags.picture
        }
      )

  const imageBase64String =
    formatImageBase64String(
      cover
    )

  const imageData = {
    extrasmall: imageBase64String,
    large: imageBase64String
  }

  const details =
    await window
      .mainProcess
      .sendAsyncCommand(
        'read-file-details',
        {
          filePath
        }
      )

  let created

  const rawCreated = details.birthtimeMs

  if (rawCreated) {
    created =
      new Date(
        rawCreated
      )
  }

  return {
    title: metatags.title,
    artist: artistData,
    artists: [
      artistData
    ],
    album: albumData,
    image: (
      imageBase64String && imageData
    ),
    created
  }
}
