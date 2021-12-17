export default function ({ trackData, audioData }) {
  const {
    album,
    image,
    ...playingData
  } = trackData

  const albumData = audioData.album
  const playingAlbumData = albumData && {
    album: albumData
  }

  const imageData = audioData.image
  const playingImageData = imageData && {
    image: imageData
  }

  return {
    ...playingData,
    ...playingAlbumData,
    ...playingImageData
  }
}
