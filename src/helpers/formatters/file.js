import fs from 'fs'
import musicMetadata from 'music-metadata'

export const tags = (tags, file) => {
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

const formatImage = cover => {
  const { format } = cover

  const base64 =
    cover.data.toString(
      'base64'
    )

  return `data:${format};base64,${base64}`
}
