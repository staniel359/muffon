export const track = ({ trackData, artistName, albumTitle, imageData }) => {
  const trackArtistName = trackData.artist?.name
  const artistNameFormatted = artistName || trackArtistName
  const trackArtistData = artistNameFormatted && {
    artist: {
      name: artistNameFormatted
    }
  }

  const trackAlbumTitle = trackData.album?.title
  const albumTitleFormatted = albumTitle || trackAlbumTitle
  const trackAlbumData = albumTitleFormatted && {
    album: {
      title: albumTitleFormatted
    }
  }

  const imageDataFormatted = imageData || trackData.image
  const trackImageData = imageDataFormatted && {
    image: {
      ...imageDataFormatted
    }
  }

  const audioDataFormatted = trackData.audio
  const trackAudioData = audioDataFormatted && {
    audio: {
      ...audioDataFormatted,
      ...trackAlbumData,
      ...trackImageData
    }
  }

  return {
    ...trackData,
    ...trackArtistData,
    ...trackAlbumData,
    ...trackImageData,
    ...trackAudioData
  }
}
