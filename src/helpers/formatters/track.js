export const track = ({
  trackData,
  artistId,
  artistName,
  albumTitle,
  imageData
}) => {
  const trackArtistId = trackData.artist?.id
  const artistIdConditional =
    artistId || trackArtistId

  const trackArtistName = trackData.artist?.name
  const artistNameConditional =
    artistName || trackArtistName

  const trackArtistData = artistNameConditional && {
    artist: {
      id: artistIdConditional,
      name: artistNameConditional
    }
  }

  const trackAlbumId = trackData.album?.id

  const trackAlbumTitle = trackData.album?.title
  const albumTitleConditional =
    albumTitle || trackAlbumTitle

  const trackAlbumData = albumTitleConditional && {
    album: {
      id: trackAlbumId,
      title: albumTitleConditional
    }
  }

  const imageDataConditional =
    imageData || trackData.image

  const trackImageData = imageDataConditional && {
    image: {
      ...imageDataConditional
    }
  }

  const audioData = trackData.audio

  const trackAudioData = audioData && {
    audio: {
      ...audioData,
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
