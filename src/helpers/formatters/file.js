import fs from 'fs'
import musicMetadata from 'music-metadata'

export function tags (tags, file) {
  const cover =
    musicMetadata.selectCover(
      tags.picture
    )

  const image = cover
    ? formatImage(cover)
    : null

  return {
    title: tags.title,
    artist: {
      name: tags.artist
    },
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

function formatImage (picture) {
  const imageBase64Data = picture.data.toString('base64')
  return `data:${picture.format};base64,${imageBase64Data}`
}
