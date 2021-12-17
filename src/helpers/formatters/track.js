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

  const trackArtistData = {
    artist: {
      id: artistIdConditional,
      name: artistNameConditional
    }
  }

  const trackArtistDataConditional = (
    artistNameConditional &&
      trackArtistData
  )

  const trackAlbumId = trackData.album?.id

  const trackAlbumTitle = trackData.album?.title

  const albumTitleConditional =
    albumTitle || trackAlbumTitle

  const trackAlbumData = {
    album: {
      id: trackAlbumId,
      title: albumTitleConditional
    }
  }

  const trackAlbumDataConditional = (
    albumTitleConditional &&
      trackAlbumData
  )

  const imageDataConditional =
    imageData || trackData.image

  const trackImageData = {
    image: {
      ...imageDataConditional
    }
  }

  const trackImageDataConditional = (
    imageDataConditional &&
      trackImageData
  )

  const audioData = trackData.audio

  const trackAudioData = {
    audio: {
      ...audioData,
      ...trackAlbumDataConditional,
      ...trackImageDataConditional
    }
  }

  const trackAudioDataConditional = (
    audioData &&
      trackAudioData
  )

  return {
    ...trackData,
    ...trackArtistDataConditional,
    ...trackAlbumDataConditional,
    ...trackImageDataConditional,
    ...trackAudioDataConditional
  }
}
