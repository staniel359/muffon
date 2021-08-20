export const track = ({
  trackData,
  artistId,
  artistName,
  albumTitle,
  imageData
}) => {
  const trackArtistId = trackData.artist?.id
  const artistIdFormatted =
    artistId || trackArtistId

  const trackArtistName = trackData.artist?.name
  const artistNameFormatted =
    artistName || trackArtistName

  const trackArtistData = artistNameFormatted && {
    artist: {
      id: artistIdFormatted,
      name: artistNameFormatted
    }
  }

  const trackAlbumId = trackData.album?.id

  const trackAlbumTitle = trackData.album?.title
  const albumTitleFormatted =
    albumTitle || trackAlbumTitle

  const trackAlbumData = albumTitleFormatted && {
    album: {
      id: trackAlbumId,
      title: albumTitleFormatted
    }
  }

  const imageDataFormatted =
    imageData || trackData.image

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
