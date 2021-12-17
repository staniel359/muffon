export default function ({ trackData, audioData }) {
  const {
    album,
    image,
    ...playingData
  } = trackData

  const albumData = audioData.album

  const playingAlbumData = {
    album: albumData
  }

  const playingAlbumDataConditional = (
    albumData &&
      playingAlbumData
  )

  const imageData = audioData.image

  const playingImageData = {
    image: imageData
  }

  const playingImageDataConditional = (
    imageData &&
      playingImageData
  )

  return {
    ...playingData,
    ...playingAlbumDataConditional,
    ...playingImageDataConditional
  }
}
