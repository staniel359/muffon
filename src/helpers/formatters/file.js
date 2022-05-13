import fs from 'fs'
import musicMetadata from 'music-metadata'

export function tags (
  tags,
  file
) {
  const artistData = {
    name: tags.artist
  }

  const cover =
    musicMetadata.selectCover(
      tags.picture
    )

  const image = cover
    ? formatImage(
      cover
    )
    : null

  return {
    title: tags.title,
    artist: artistData,
    artists: [
      artistData
    ],
    album: {
      title: tags.album
    },
    image: {
      extrasmall: image,
      original: image
    },
    created: fs.statSync(
      file.path
    ).birthtime
  }
}

function formatImage (
  cover
) {
  const {
    format
  } = cover

  const base64 =
    cover.data.toString(
      'base64'
    )

  return `data:${format};base64,${base64}`
}
