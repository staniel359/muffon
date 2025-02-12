function formatCover (
  cover
) {
  if (cover) {
    const {
      format,
      data: imageBytes
    } = cover

    const base64 =
      Buffer.from(
        imageBytes
      ).toString(
        'base64'
      )

    return `data:${format};base64,${base64}`
  }
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

  const image =
    formatCover(
      cover
    )

  const imageData = {
    extrasmall: image,
    large: image
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

  const created =
    details.birthtime

  return {
    title: metatags.title,
    artist: artistData,
    artists: [
      artistData
    ],
    album: albumData,
    image: (
      image && imageData
    ),
    created
  }
}
