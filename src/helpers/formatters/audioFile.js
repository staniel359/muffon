import {
  ipcRenderer
} from 'electron'
import {
  selectCover
} from 'music-metadata'

function formatCover (
  cover
) {
  if (cover) {
    const {
      format
    } = cover

    const base64 =
      cover.data.toString(
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
    selectCover(
      metatags.picture
    )

  const image =
    formatCover(
      cover
    )

  const imageData = {
    extrasmall: image,
    large: image
  }

  function getFileDetails () {
    return ipcRenderer.invoke(
      'read-file-details',
      {
        filePath
      }
    )
  }

  const details =
    await getFileDetails()

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
